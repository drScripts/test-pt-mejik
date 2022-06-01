import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GeneralInput } from "../../components";
import { Base, Navbar } from "../../containers";
import { UPDATERACK } from "../../graphql/mutations";
import { GETRACK } from "../../graphql/queries";

export default function EditRackPage() {
  const navigation = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  const { data, loading } = useQuery(GETRACK, {
    variables: {
      id,
    },
    onCompleted: (resData) => {
      const { code, name } = resData.rack;
      setForm({
        code,
        name,
      });
    },
  });

  const [updateRack, { loading: loadingUpdate }] = useMutation(UPDATERACK, {
    onCompleted: () => {
      toast.success("Successfully Update Rack");
      navigation("/admin/racks");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    updateRack({
      variables: {
        input: {
          name: form?.name,
          code: form?.code,
        },
        id,
      },
    });
  };

  return (
    <Base isLoading={loading || loadingUpdate}>
      <Navbar />
      <div className="container mx-auto mb-20">
        <h1 className="py-7 text-3xl font-libre font-bold">
          Edit Rack - {data?.rack?.code}
        </h1>
        <form onSubmit={onSubmit}>
          <GeneralInput
            name={"name"}
            id={"name"}
            value={form.name}
            placeholder={"Insert the title of rack"}
            label={"Rack Name"}
            required
            onChange={onFormChange}
          />
          <GeneralInput
            label={"Rack Code"}
            value={form.code}
            name={"code"}
            id={"code"}
            onChange={onFormChange}
            placeholder={"Insert Rack Code"}
            type={"text"}
            className={"my-4"}
            required
          />

          <div className="text-right mt-10">
            <button className="px-5 py-2 bg-brownLightPastel hover:bg-brownLight rounded-lg text-xl font-medium font-libre">
              Update Rack
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
}
