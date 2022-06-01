import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GeneralInput } from "../../components";
import { Base, Navbar } from "../../containers";
import { UPDATECATEGORY } from "../../graphql/mutations";
import { GETCATEGORY } from "../../graphql/queries";

export default function EditCategoryPage() {
  const navigation = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  const { data, loading } = useQuery(GETCATEGORY, {
    variables: {
      id,
    },
    onCompleted: (resData) => {
      const { code, name } = resData.category;
      setForm({
        code,
        name,
      });
    },
  });

  const [updateCategory, { loading: loadingUpdate }] = useMutation(
    UPDATECATEGORY,
    {
      onCompleted: () => {
        toast.success("Successfully Update Rack");
        navigation("/admin/categories");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    updateCategory({
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
          Edit Category - {data?.category?.code}
        </h1>
        <form onSubmit={onSubmit}>
          <GeneralInput
            name={"name"}
            id={"name"}
            value={form.name}
            placeholder={"Insert the title of category"}
            label={"Category Name"}
            required
            onChange={onFormChange}
          />
          <GeneralInput
            label={"Category Code"}
            value={form.code}
            name={"code"}
            id={"code"}
            onChange={onFormChange}
            placeholder={"Insert Category Code"}
            type={"text"}
            className={"my-4"}
            required
          />

          <div className="text-right mt-10">
            <button className="px-5 py-2 bg-brownLightPastel hover:bg-brownLight rounded-lg text-xl font-medium font-libre">
              Update Category
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
}
