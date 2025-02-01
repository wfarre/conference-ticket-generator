import { FormEvent, useState } from "react";
import ImgPlaceholder from "../assets/images/icon-upload.svg";
import InfoIcon from "../assets/images/icon-info.svg";

interface Props {
  submitForm: (entries: Entries) => void;
}

export interface Entries {
  fullName: string;
  email: string;
  github: string;
  avatar: FileList | null;
}

const formFieldsets = [
  {
    id: "full-name",
    key: "fullName",
    label: "Full Name",
  },
  {
    id: "email",
    key: "email",
    label: "Email Address",
  },
  {
    id: "github",
    key: "github",
    label: "GitHub Username",
  },
];

const Form = (props: Props) => {
  const [entries, setEntries] = useState<Entries>({
    fullName: "",
    email: "",
    github: "",
    avatar: null,
  });

  console.log(entries);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(entries);
    props.submitForm(entries);
  };

  return (
    <form
      action=""
      className="flex flex-col gap-6 max-w-[522px] mx-auto"
      onSubmit={(e) => handleSubmit(e)}
    >
      <fieldset>
        <label htmlFor="avatar" className="flex flex-col gap-3">
          Upload Avatar
        </label>

        {entries.avatar ? (
          <picture>
            <img src={URL.createObjectURL(entries.avatar[0])} alt="" />
          </picture>
        ) : (
          <>
            <div className="relative flex flex-col border border-dashed rounded-xl py-5 gap-4 items-center bg-white-transparent">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                className="absolute top-0 left-0 h-full w-full opacity-0 z-50"
                onChange={(e) =>
                  setEntries({
                    ...entries,
                    avatar: e.target.files,
                  })
                }
              />
              <picture className="relative h-12.5 w-12.5  bg-white-transparent rounded-lg">
                <img
                  className="absolute w-full h-full top-0 left-0 p-2.5"
                  src={ImgPlaceholder}
                  alt=""
                />
              </picture>
              <figcaption>Drag and drop or click to upload</figcaption>
            </div>
            <figure className="flex gap-2 mt-3">
              <picture className="relative h-4 w-4">
                <img
                  className="absolute h-full w-full top-0 left-0"
                  src={InfoIcon}
                  alt=""
                />
              </picture>
              <figcaption className="text-xs">
                Upload your photo (JPG or PNG, max size: 500KB).
              </figcaption>
            </figure>
          </>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-6">
        {formFieldsets.map((field, index) => {
          if (field.key !== "avatar") {
            return (
              <label
                htmlFor={field.id}
                className="flex flex-col gap-3"
                key={"field" + index}
              >
                {field.label}
                <input
                  type={field.id === "email" ? "email" : "text"}
                  name={field.id}
                  id={field.id}
                  className="border boder-1 rounded-xl p-4 bg-white-transparent"
                  value={String(entries[field.key as keyof Entries])}
                  onChange={(e) =>
                    setEntries({ ...entries, [field.key]: e.target.value })
                  }
                />
              </label>
            );
          }
        })}
      </fieldset>

      <button className="bg-orange-500 text-neutral-900 rounded-xl py-4 font-bold">
        Generate My Ticket
      </button>
    </form>
  );
};

export default Form;
