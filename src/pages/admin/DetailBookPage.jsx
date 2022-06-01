import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GeneralInput } from "../../components";
import SelectOption from "../../components/SelectCustom";
import { Base, Navbar } from "../../containers";
import { UPDATEBOOKMUTATE } from "../../graphql/mutations";
import {
  DETAILBOOKQUERY,
  GETAUTORSQUERY,
  GETCATEGORIES,
  GETRACKS,
} from "../../graphql/queries";

export default function DetailBookPage() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    code: "",
    category: {},
    rack: {},
    author: {},
    cover: "",
  });

  const { data: authors, loading: loadingAuthors } = useQuery(GETAUTORSQUERY);

  const { data, loading } = useQuery(DETAILBOOKQUERY, {
    variables: {
      id,
    },
  });
  const { data: categories, loading: loadingCategories } =
    useQuery(GETCATEGORIES);
  const { data: racks, loading: loadingRacks } = useQuery(GETRACKS);

  const [updateBook, { loading: updateeLoading }] = useMutation(
    UPDATEBOOKMUTATE,
    {
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: () => {
        toast.success("Successfully Update Book!");
        navigation("/admin/books");
      },
    }
  );

  const authorsData = useMemo(() => {
    return authors?.authors?.map((author) => ({
      id: author?.id,
      name: author?.name,
      unavailable: false,
      selector: "author",
    }));
  }, [authors]);

  const categoriesData = useMemo(() => {
    return categories?.categories?.map((category) => ({
      id: category?.id,
      name: category?.name,
      unavailable: false,
      selector: "category",
    }));
  }, [categories]);

  const racksData = useMemo(() => {
    return racks?.racks?.map((rack) => ({
      id: rack?.id,
      name: rack?.name,
      unavailable: false,
      selector: "rack",
    }));
  }, [racks]);

  useEffect(() => {
    setForm({
      name: data?.book?.name ?? "",
      author: {
        id: data?.book?.author?.id,
        name: data?.book?.author?.name,
        unavailable: false,
        selector: "author",
      },
      category: {
        id: data?.book?.category?.id,
        name: data?.book?.category?.name,
        unavailable: false,
        selector: "category",
      },
      description: data?.book?.description ?? "",
      rack: {
        id: data?.book?.rack?.id,
        name: data?.book?.rack?.name,
        unavailable: false,
        selector: "rack",
      },
      code: data?.book?.code ?? "",
      cover: data?.book?.cover ?? "",
    });
    console.clear();
  }, [data]);

  const onFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectChange = (val) => {
    setForm({
      ...form,
      [val.selector]: val,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateBook({
      variables: {
        id,
        input: {
          name: form.name,
          description: form.description,
          cover: form.cover,
          code: form.code,
          categoryId: form.category?.id,
          rackId: form.rack?.id,
          authorId: form.author?.id,
        },
      },
    });
  };

  return (
    <Base
      isLoading={
        loading ||
        loadingAuthors ||
        loadingCategories ||
        loadingRacks ||
        updateeLoading
      }
    >
      <Navbar />
      <div className="container mx-auto mb-20">
        <h1 className="py-7 text-3xl font-libre font-bold">
          Detail Book - {data?.book?.code}
        </h1>
        <form onSubmit={onSubmit}>
          <GeneralInput
            name={"name"}
            id={"name"}
            value={form.name}
            placeholder={"Insert the title of books"}
            label={"Book Name"}
            required
            onChange={onFormChange}
          />
          <GeneralInput
            label={"Book Code"}
            required
            value={form.code}
            name={"code"}
            id={"code"}
            onChange={onFormChange}
            placeholder={"Insert Book Code"}
            type={"text"}
            className={"my-4"}
          />
          <GeneralInput
            label={"Book Cover Url"}
            value={form.cover}
            name={"cover"}
            id={"cover"}
            onChange={onFormChange}
            placeholder={"Insert Book Cover Url"}
            type={"text"}
            className={"my-4"}
          />
          <GeneralInput
            label={"Book Description"}
            required
            value={form.description}
            name={"description"}
            id={"description"}
            onChange={onFormChange}
            placeholder={"Insert Book Description"}
            type={"area"}
            className={"my-4"}
          />
          <SelectOption
            label={"Book Author"}
            required
            value={form.author}
            type={"select"}
            data={authorsData}
            name={"author"}
            placeholder={"Select Book Author"}
            id={"author"}
            onChange={onSelectChange}
          />
          <SelectOption
            label={"Book Rack"}
            required
            value={form.rack}
            type={"select"}
            data={racksData}
            name={"rack"}
            placeholder={"Select Book Rack"}
            id={"rack"}
            onChange={onSelectChange}
            className={"my-4"}
          />
          <SelectOption
            label={"Book Category"}
            required
            value={form.category}
            type={"select"}
            data={categoriesData}
            name={"category"}
            placeholder={"Select Book Category"}
            id={"category"}
            onChange={onSelectChange}
          />
          <div className="text-right mt-10">
            <button className="px-5 py-2 bg-brownLightPastel hover:bg-brownLight rounded-lg text-xl font-medium font-libre">
              Update Book
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
}
