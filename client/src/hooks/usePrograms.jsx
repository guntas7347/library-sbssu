import React, { useEffect, useMemo, useState } from "react";
import server from "../services/server.api";

const usePrograms = ({ formFields, handleChange }) => {
  const [programsArr, setProgramsArr] = useState([
    { name: "", specialization: [{ name: "" }] },
  ]);

  const batchYears = useMemo(() => {
    const array = [];
    const currentYear = new Date().getFullYear();
    for (let index = currentYear; index > currentYear - 3; index--) {
      array.push({
        label: index.toString(),
        value: index.toString(),
      });
    }
    return array;
  }, []);

  const programs = () => {
    const pr = [];
    programsArr.forEach((p) => {
      pr.push(p.name);
    });
    return pr;
  };

  const specializations = () => {
    const sp = [];
    programsArr
      .find((p) => {
        return p.name === formFields.program?.toUpperCase();
      })
      ?.specialization.forEach((s) => sp.push(s.name));

    return sp;
  };

  useEffect(() => {
    (async () => {
      try {
        const p = await server.public.getPrograms();
        setProgramsArr(p.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const pr = programs();
    if (pr.length && !formFields.program) {
      handleChange({ target: { name: "program", value: pr[0] } });
    }
  }, [programsArr]);

  useEffect(() => {
    const sp = specializations();
    if (sp.length && !formFields.specialization) {
      handleChange({ target: { name: "specialization", value: sp[0] } });
    }
  }, [formFields.program]);

  return { programs, specializations, batchYears };
};

export default usePrograms;
