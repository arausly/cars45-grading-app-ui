import React, { useState, useEffect, createContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  IoIosArrowRoundBack,
  IoMdInformationCircleOutline
} from "react-icons/io";
import { NavLink, Redirect } from "react-router-dom";

//custom dependencies
import { CustomLoader } from "../shared";
import { withNotifier } from "../shared/Notifications/notification.main";
import CustomIsQC from "../shared/isQC";

//utils
import {
  gradeLetters,
  gradeScale,
  dictateColorSetting,
  remove
} from "./gradecar.utils";

import {
  getGradeConfig,
  getFetchedCar,
  saveCar,
  saveCarGradeOnCMS,
  saveCarGrade
} from "../GradeCar/gradecar.graphql";

//components
import GradeDesktopScreen from "./components/gradeDesktop.components";
import GradeMobileScreen from "./components/gradeMobile.components";

export const CarGradeContext = createContext();

const CarGrade = ({ location: { state }, notifyFailure, history }) => {
  /** function states */
  const [selectedKey, setSelectedKey] = useState("AC");
  const [checkedKeys, setCheckedKeys] = useState(["AC"]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [sectionConfig, setSectionConfig] = useState({});
  const [allFactors, setAllFactors] = useState([]);
  const [[totalScore, totalGrade, demotedGrade], setGradeOveralls] = useState([
    100,
    "A",
    "A"
  ]);
  const [redirectToResult, setRedirectToResult] = useState(false);

  //query and mutations
  const configQuery = useQuery(getGradeConfig);
  const carQuery = useQuery(getFetchedCar);
  const carQueryDataExist = prop => carQuery.data && carQuery.data[prop];

  const [createCar, createdCarResult] = useMutation(saveCar, {
    variables: {
      input: carQuery.data && remove(carQuery.data, ["__typename"])
    }
  });

  let gradeResult = {
    lotNumber: carQueryDataExist("lotNumber"),
    overallScore: parseInt(totalScore),
    overallCarGrade: totalGrade,
    allFactors,
    regradedCarGrade: demotedGrade,
    carId: createdCarResult.data && createdCarResult.data.id,
    performedByQc: false,
    car: `${carQueryDataExist("make")}/${carQueryDataExist(
      "model"
    )}/${carQueryDataExist("year")}`
  };

  const [saveGrade, savedGradeResult] = useMutation(saveCarGrade, {
    variables: {
      input: gradeResult
    }
  });

  /** carID is the carUUID from FCG */
  const defectiveFactors = {};
  allFactors.map(factor => {
    const [group, condition] = factor.split("/");
    if (defectiveFactors[group]) {
      defectiveFactors[group].push(condition);
    } else {
      defectiveFactors[group] = [condition];
    }
  });
  let gradeDescription = "";
  for (let factor in defectiveFactors) {
    gradeDescription += `${factor}\n${defectiveFactors[factor].join(",")}\n`;
  }
  let gradeToCMS = {
    input: {
      carId: carQueryDataExist("carUUID"),
      grade: totalGrade,
      description: gradeDescription
    }
  };

  if (savedGradeResult.data && savedGradeResult.data.cmsGradeId) {
    gradeToCMS.cmsGradeId = savedGradeResult.data.cmsGradeId;
  }

  const [saveGradeOnCMS, gradeSaveResult] = useMutation(saveCarGradeOnCMS, {
    variables: gradeToCMS
  });

  const getScreenWidth = () =>
    setWindowWidth(document.documentElement.clientWidth || window.innerWidth);

  useEffect(() => {
    getScreenWidth();
    window.addEventListener("resize", getScreenWidth);
    return () => window.removeEventListener("resize", getScreenWidth);
  }, []);

  /** functions handlers */
  const calculateSectionGradeAndScore = derivedSectionConfig => {
    for (let category in derivedSectionConfig) {
      let sectionGrade = "A";
      for (let [, sectionMaxGrade] of derivedSectionConfig[category]
        .conditions) {
        sectionGrade =
          (sectionGrade < sectionMaxGrade && sectionMaxGrade) || sectionGrade;
      }
      derivedSectionConfig[category].grade = sectionGrade;
      derivedSectionConfig[category].score = Math.floor(
        (gradeLetters[sectionGrade] / 5) * 10
      );
    }
    setSectionConfig(derivedSectionConfig);
    calculateOveralls(derivedSectionConfig);
  };

  /** this handler defines what happens when a condition is either selected or deselected */
  const handleSelectionAndDeselection = (
    selected,
    sectionMaxGrade,
    category,
    condition
  ) => {
    const newSectionConfig = { ...sectionConfig };
    let checkedFactors = [...allFactors];
    /** has a condition being checked */
    if (selected) {
      setAllFactors([
        ...new Set([
          ...checkedFactors,
          `${category}/${condition}/${sectionMaxGrade}`
        ])
      ]);
      /** checks if the config category exists in the config state object, this handles
       *  first selection to last selection
       */
      if (newSectionConfig[category]) {
        newSectionConfig[category].conditions.set(condition, sectionMaxGrade);
        calculateSectionGradeAndScore(newSectionConfig);
      } else {
        newSectionConfig[category] = {};
        newSectionConfig[category].conditions = new Map();
        newSectionConfig[category].conditions.set(condition, sectionMaxGrade);
        calculateSectionGradeAndScore(newSectionConfig);
      }
    } else {
      newSectionConfig[category].conditions.delete(condition);
      setAllFactors(
        checkedFactors.filter(
          checkedFactor =>
            checkedFactor !== `${category}/${condition}/${sectionMaxGrade}`
        )
      );
      calculateSectionGradeAndScore(newSectionConfig);
    }
  };

  const calculateOveralls = derivedSectionConfig => {
    let overallScore = 0,
      overallGrade,
      regradedGrade = "A",
      totalMaxConfigScore = 0;
    for (let category in derivedSectionConfig) {
      totalMaxConfigScore += 10;
      const { score, grade } = derivedSectionConfig[category];
      overallScore += score;
      regradedGrade = (regradedGrade < grade && grade) || regradedGrade;
    }
    overallScore = 100 - totalMaxConfigScore + overallScore;

    overallGrade = gradeScale(overallScore);

    setGradeOveralls([overallScore, overallGrade, regradedGrade]);
  };

  /** function load handlers */
  if (carQuery.loading || configQuery.loading) return <CustomLoader />;

  /** Error handlers */
  if (carQuery.error || configQuery.error) {
    notifyFailure("Failed to get Car or configs");
    return null;
  }

  if (!carQuery || !carQuery.data || (carQuery.data && !carQuery.data.car)) {
    history.goBack();
  }

  /** function utils */
  const gradeKeys = configQuery.data.configs.map(({ key }) => key);
  const getWavyColor = dictateColorSetting(
    (sectionConfig[selectedKey] && sectionConfig[selectedKey].grade) || "A"
  );

  const handleSaveGrade = e => {
    // e.preventDefault();
    // createCar();
    // saveGrade();
    // saveGradeOnCMS();
    return setRedirectToResult(true);
  };

  if (redirectToResult) return <Redirect to={{ pathname: "/result" }} />;

  return (
    <CarGradeContext.Provider
      value={{
        gradeKeys,
        gradeConfigs: configQuery.data.configs,
        selectedKey,
        setSelectedKey,
        checkedKeys,
        setCheckedKeys,
        handleSelectionAndDeselection,
        sectionConfig
      }}
    >
      {createdCarResult.loading ||
        savedGradeResult.loading ||
        (gradeSaveResult.loading && <CustomLoader />)}
      <CustomIsQC isQC={false} />
      <div className="justify-content-md-center">
        <div className="mainContainer my-5 py-5 mb-10">
          <div className="gradecar-title-box">
            <div className="gradecar-back-button">
              <NavLink to="/">
                <IoIosArrowRoundBack />
                <p>Back</p>
              </NavLink>
              <p className="gradecar-title">Grade Car</p>
            </div>
            <div className="gradecar-info">
              <div>
                <IoMdInformationCircleOutline />
                <div></div>
                <div className="cars45-graded-cardinfo">
                  <ul>
                    <li>
                      <span>Lot Number </span>
                      <span>{carQuery.data.car.lotNumber}</span>
                    </li>
                    <li>
                      <span>Vin</span> <span>{carQuery.data.car.vin}</span>
                    </li>
                    <li>
                      <span>Car score </span>
                      <span className={dictateColorSetting(demotedGrade)}>
                        {demotedGrade}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`info-alarm wave-effect ${getWavyColor}`}></div>
            </div>
          </div>
          {/** @TODO split code and conditionally render  */}
          {(windowWidth <= 600 && <GradeMobileScreen />) || (
            <GradeDesktopScreen />
          )}
          <div className="dashboardButtonContainer">
            <button
              type="button"
              className={
                (checkedKeys.length < 10 && "dashboardButton") ||
                "btn--animated primary dashboardButton cars45-btn"
              }
              onClick={handleSaveGrade}
              disabled={checkedKeys.length < 10}
            >
              Grade
            </button>
          </div>
        </div>
      </div>
    </CarGradeContext.Provider>
  );
};

export default withNotifier(CarGrade);
