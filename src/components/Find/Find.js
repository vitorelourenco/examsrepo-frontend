import useIntialDegreeOptions from "../../hooks/useInitialDegreeOptions";
import { useState } from "react";
import styled from "styled-components";
import PickOne from "../PickOne/PickOne";
import { Link } from "react-router-dom";
import { HiBookOpen } from "react-icons/hi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FindByCourse from "./FindByCourse";
import FindByInstructor from "./FindByInstructor";
import Degree from "../Selection/Degree";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const degreesURL = new URL("degrees", BASE_URL);

export default function Find() {
  const [degrees, setDegrees] = useState([]);

  const [examOptions, setExamOptions] = useState({
    degreeId: "",
  });

  useIntialDegreeOptions(
    examOptions,
    setDegrees,
    setExamOptions
  );

  const { findBy } = useParams();
  return (
    <Wrapper>
      <Spacer>
        <Degree
          {...{ examOptions,setExamOptions, degrees, setDegrees, degreesURL }}
        />
      </Spacer>
      {findBy ? (
        findBy === "instructor" ? (
          <FindByInstructor degreeId={examOptions.degreeId}/>
        ) : (
          <FindByCourse degreeId={examOptions.degreeId}/>
        )
      ) : (
        <Choices />
      )}
    </Wrapper>
  );
}

function Choices() {
  return (
    <PickOne>
      <Link to="/find/instructor">
        <FaChalkboardTeacher />
      </Link>
      <Link to="/find/course">
        <HiBookOpen />
      </Link>
    </PickOne>
  );
}

const Wrapper = styled.div`
  select {
    width: 100%;
  }
`;

const Spacer = styled.div`
  padding: 20px;
`;
