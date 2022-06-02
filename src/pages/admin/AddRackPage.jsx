import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GeneralInput } from "../../components";
import { Base, Navbar } from "../../containers";
import { ADDRACK } from "../../graphql/mutations";

export default function AddRackPage() {
  document.title = "Story Book Admin | Add Rack";
  const navigation = useNavigate();

  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  const [addRack, { loading }] = useMutation(ADDRACK, {
    onCompleted: () => {
      toast.success("Successfully Add Rack");
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

    addRack({
      variables: {
        input: {
          name: form?.name,
          code: form?.code,
        },
      },
    });
  };

  return (
    <Base isLoading={loading}>
      <Navbar />
      <div className="container mx-auto mb-20">
        <h1 className="py-7 text-3xl font-libre font-bold">Add New Rack</h1>
        <form onSubmit={onSubmit}>
          <GeneralInput
            name={"name"}
            id={"name"}
            value={form.name}
            placeholder={"Insert the title of Rack"}
            label={"Book Name"}
            required
            onChange={onFormChange}
          />
          <GeneralInput
            label={"Book Code"}
            value={form.code}
            name={"code"}
            id={"code"}
            onChange={onFormChange}
            placeholder={"Insert Rack Code"}
            type={"text"}
            className={"my-4"}
          />

          <div className="text-right mt-10">
            <button className="px-5 py-2 bg-brownLightPastel hover:bg-brownLight rounded-lg text-xl font-medium font-libre">
              Add Rack
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
}
