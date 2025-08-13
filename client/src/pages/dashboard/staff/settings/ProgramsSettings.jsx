import Spinner from "../../../../components/feedback/spinner/Spinner";
import SimpleHeader from "../../../../components/header/SimpleHeader";
import AddProgramCard from "../../../../components/features/dashboard/staff/settings/programs/AddProgramCard";
import SpecializationCard from "../../../../components/features/dashboard/staff/settings/programs/SpecializationCard";
import SaveCancelButton from "../../../../components/buttons/SaveCancelButton";
import { toSnakeCase } from "../../../../utils/functions";
import useSetting from "../../../../hooks/useSetting";

const ProgramsSettings = () => {
  const { data, setData, loading, handleSave } = useSetting("PROGRAMS", []);

  if (loading) return <Spinner />;

  const addProgram = ({ program, duration }) => {
    setData([
      ...data,
      {
        name: toSnakeCase(program),
        duration,
        specialization: [{ name: "other" }],
      },
    ]);
  };

  const deleteProgram = (index) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
  };

  const addSpecialization = (index, name) => {
    const updated = [...data];
    updated[index].specialization.unshift({ name: toSnakeCase(name) });
    setData(updated);
  };

  const deleteSpecialization = (pIndex, sIndex) => {
    const updated = [...data];
    updated[pIndex].specialization = updated[pIndex].specialization.filter(
      (_, i) => i !== sIndex
    );
    setData(updated);
  };

  return (
    <>
      <div className="space-y-5">
        <SimpleHeader
          title="Programs"
          sub="Manage your library data and their substreams"
        />
        <AddProgramCard onAddProgram={addProgram} />
        <div className="grid gap-3">
          {data.map((program, idx) => (
            <SpecializationCard
              key={program.name}
              program={program}
              onSubAdd={(substream) => addSpecialization(idx, substream)}
              onSubDelete={(sIdx) => deleteSpecialization(idx, sIdx)}
              onDeleteProgram={() => deleteProgram(idx)}
            />
          ))}
        </div>
        <SaveCancelButton onSave={handleSave} />
      </div>
    </>
  );
};

export default ProgramsSettings;
