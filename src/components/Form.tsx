import { ChangeEvent, DragEvent, FormEvent, useState } from "react";
import ImgPlaceholder from "../assets/images/icon-upload.svg";
import InfoIcon from "../assets/images/icon-info.svg";
import InfoIconError from "../assets/images/icon-info-error.svg";

interface Props {
  submitForm: (entries: Entries) => void;
}

const checkIfEmailIsValid = (email: string): boolean => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const checkIfEntryIsNotEmpty = (entry: string): boolean => entry.length > 0;

export interface Entries {
  fullName: string;
  email: string;
  github: string;
  avatar: FileList | null;
}
export interface EntriesError {
  fullName: boolean;
  email: boolean;
  github: boolean;
  avatar: boolean;
}

const formFieldsets = [
  {
    id: "full-name",
    key: "fullName",
    label: "Full Name",
    errorMsg: "Please enter a valid name.",
    validation: checkIfEntryIsNotEmpty,
  },
  {
    id: "email",
    key: "email",
    label: "Email Address",
    errorMsg: "Please enter a valid email address.",
    validation: checkIfEmailIsValid,
  },
  {
    id: "github",
    key: "github",
    label: "GitHub Username",
    errorMsg: "Please enter a valid GitHub username.",
    validation: checkIfEntryIsNotEmpty,
  },
];

const Form = (props: Props) => {
  const [entries, setEntries] = useState<Entries>({
    fullName: "",
    email: "",
    github: "",
    avatar: null,
  });

  const [entriesError, setEntriesError] = useState<EntriesError>({
    fullName: false,
    email: false,
    github: false,
    avatar: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let isFormValid = true;
    formFieldsets.map((field) => {
      setEntriesError({
        ...entriesError,
        [field.key]: !field.validation(
          String(entries[field.key as keyof Entries])
        ),
      });
    });

    Object.values(entries).map((value) => {
      if (!value) return (isFormValid = false);
    });

    if (isFormValid) props.submitForm(entries);
  };

  const handleAddPicture = (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement;
    if (target.files?.length && target?.files?.length > 0) {
      if (target.files[0].size > 500000) {
        setEntriesError({ ...entriesError, avatar: true });
      } else {
        setEntriesError({ ...entriesError, avatar: false });
        setEntries({
          ...entries,
          avatar: target.files,
        });
      }
    }
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

        <div className="relative flex flex-col border border-dashed rounded-xl py-5 gap-4 items-center bg-white-transparent">
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            className="absolute top-0 left-0 h-full w-full opacity-0 z-50"
            hidden={entries.avatar !== null}
            onChange={handleAddPicture}
            onDrop={handleAddPicture}
          />
          <picture className="relative h-12.5 w-12.5  bg-white-transparent rounded-lg overflow-hidden">
            <img
              className={`absolute w-full h-full top-0 left-0 object-cover ${
                !entries.avatar && "p-2.5"
              }`}
              src={
                entries.avatar
                  ? URL.createObjectURL(entries.avatar[0])
                  : ImgPlaceholder
              }
              alt=""
            />
          </picture>

          {!entries.avatar ? (
            <p>Drag and drop or click to upload</p>
          ) : (
            <ul className="flex gap-2">
              <li className="z-50">
                <button
                  type="button"
                  onClick={() => {
                    setEntries({ ...entries, avatar: null });
                  }}
                  className="py-1 px-2 bg-white-transparent rounded-sm underline font-regular text-xs z-50"
                >
                  Remove image
                </button>
              </li>
              <li className="z-50">
                <button
                  type="button"
                  className="py-1 px-2 bg-white-transparent rounded-sm font-regular text-xs z-50"
                  onClick={() => {
                    const avatarInput = document.getElementById("avatar");
                    avatarInput?.click();
                  }}
                >
                  Change image
                </button>
              </li>
            </ul>
          )}
        </div>
        <figure className="flex gap-2 mt-3">
          <picture className="relative h-4 w-4">
            <img
              className="absolute h-full w-full top-0 left-0"
              src={entriesError.avatar ? InfoIconError : InfoIcon}
              alt=""
            />
          </picture>
          <figcaption
            className={`text-xs ${
              entriesError.avatar ? "text-orange-700" : "text-neutral-300"
            }`}
          >
            {entriesError.avatar
              ? "File too large. Please upload a photo under 500KB"
              : "Upload your photo (JPG or PNG, max size: 500KB)"}
            .
          </figcaption>
        </figure>
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
                  onBlur={() => {
                    setEntriesError({
                      ...entriesError,
                      [field.key]: !field.validation(
                        String(entries[field.key as keyof Entries])
                      ),
                    });
                  }}
                />
                {entriesError[field.key as keyof EntriesError] && (
                  <figure className="flex gap-2">
                    <picture className="relative h-4 w-4">
                      <img
                        className="absolute h-full w-full top-0 left-0"
                        src={InfoIconError}
                        alt=""
                      />
                    </picture>
                    <figcaption className={`text-xs text-orange-700`}>
                      {field.errorMsg}
                    </figcaption>
                  </figure>
                )}
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
