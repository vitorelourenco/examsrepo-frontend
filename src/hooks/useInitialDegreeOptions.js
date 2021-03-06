import { useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const degreesURL = new URL("degrees", BASE_URL);

export default function useInitialDegreeAndCategoriesOptions(
  examOptions,
  setDegrees,
  setExamOptions
) {
  useEffect(() => {
    const p1 = axios.get(degreesURL);

    Promise.all([p1])
      .then(([degreeResponse]) => {
        const newExamOptions = { ...examOptions };
        newExamOptions.degreeId = `${degreeResponse.data[0].id}`;
        setDegrees(degreeResponse.data);
        setExamOptions(newExamOptions);
      })
      .catch((err) => alert(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
