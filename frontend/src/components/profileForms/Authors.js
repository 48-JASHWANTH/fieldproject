import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forms.css";
import { axiosWithToken } from "../../axiosWithToken";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Authors = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const formValues = watch();

  const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      for (const key in parsedFormData) {
        setValue(key, parsedFormData[key]);
      }
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formValues));
  }, [formValues]);

  async function onSubmit(data) {
    console.log(data);
    let res = await axiosWithToken.post(
      "http://localhost:5000/userApi/Authors",
      data
    );
    if (res.status === 200) {
      navigate("/FacultyPage/FacultyInfo/FacultyProfile");
    }
  }

  const handlePrev = () => {
    navigate("/FacultyPage/CompleteProfile/Nomination");
  };

  return (
    <div className="container mt-5 shadow-lg p-3 mb-5 bg-white rounded">
      <h2 className="form-heading mb-4">Authors Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="author_name" className="form-label">
              Author Name
            </label>
            <input
              type="text"
              {...register("author_name", { required: true })}
              className={`form-control ${
                errors.author_name ? "is-invalid" : ""
              }`}
              id="author_name"
            />
            {errors.author_name && (
              <div className="invalid-feedback">Author name is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_ID" className="form-label">
              Author ID
            </label>
            <input
              type="text"
              {...register("author_ID", { required: true })}
              className={`form-control ${errors.author_ID ? "is-invalid" : ""}`}
              id="author_ID"
            />
            {errors.author_ID && (
              <div className="invalid-feedback">Author ID is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_institute" className="form-label">
              Author Institute
            </label>
            <input
              type="text"
              {...register("author_institute", { required: true })}
              className={`form-control ${
                errors.author_institute ? "is-invalid" : ""
              }`}
              id="author_institute"
            />
            {errors.author_institute && (
              <div className="invalid-feedback">
                Author Institute is required
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="author_email" className="form-label">
              Author Email
            </label>
            <input
              type="email"
              {...register("author_email", { required: true })}
              className={`form-control ${
                errors.author_email ? "is-invalid" : ""
              }`}
              id="author_email"
            />
            {errors.author_email && (
              <div className="invalid-feedback">Author email is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_phno" className="form-label">
              Author Phone Number
            </label>
            <input
              type="tel"
              {...register("author_phno", { required: true })}
              className={`form-control ${
                errors.author_phno ? "is-invalid" : ""
              }`}
              id="author_phno"
            />
            {errors.author_phno && (
              <div className="invalid-feedback">
                Author phone number is required
              </div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_gender" className="form-label">
              Author Gender
            </label>
            <input
              type="text"
              {...register("author_gender", { required: true })}
              className={`form-control ${
                errors.author_gender ? "is-invalid" : ""
              }`}
              id="author_gender"
            />
            {errors.author_gender && (
              <div className="invalid-feedback">Author gender is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label d-block">
              Is Author from Industry?
            </label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("is_author_from_industry", { required: true })}
                value="Yes"
                className="form-check-input"
                id="isAuthorFromIndustryYes"
              />
              <label
                className="form-check-label"
                htmlFor="isAuthorFromIndustryYes"
              >
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("is_author_from_industry", { required: true })}
                value="No"
                className="form-check-input"
                id="isAuthorFromIndustryNo"
              />
              <label
                className="form-check-label"
                htmlFor="isAuthorFromIndustryNo"
              >
                No
              </label>
            </div>
            {errors.is_author_from_industry && (
              <div className="invalid-feedback d-block">
                This field is required
              </div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_state" className="form-label">
              Author State
            </label>
            <input
              type="text"
              {...register("author_state", { required: true })}
              className={`form-control ${
                errors.author_state ? "is-invalid" : ""
              }`}
              id="author_state"
            />
            {errors.author_state && (
              <div className="invalid-feedback">Author state is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_country" className="form-label">
              Author Country
            </label>
            <input
              type="text"
              {...register("author_country", { required: true })}
              className={`form-control ${
                errors.author_country ? "is-invalid" : ""
              }`}
              id="author_country"
            />
            {errors.author_country && (
              <div className="invalid-feedback">Author country is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label d-block">Is Author a Student?</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("is_author_student", { required: true })}
                value="Yes"
                className="form-check-input"
                id="isAuthorStudentYes"
              />
              <label className="form-check-label" htmlFor="isAuthorStudentYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("is_author_student", { required: true })}
                value="No"
                className="form-check-input"
                id="isAuthorStudentNo"
              />
              <label className="form-check-label" htmlFor="isAuthorStudentNo">
                No
              </label>
            </div>
            {errors.is_author_student && (
              <div className="invalid-feedback d-block">
                This field is required
              </div>
            )}
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Is Author Foreign?</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("is_author_foreign", { required: true })}
                value="Yes"
                className="form-check-input"
                id="isAuthorForeignYes"
              />
              <label className="form-check-label" htmlFor="isAuthorForeignYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("is_author_foreign", { required: true })}
                value="No"
                className="form-check-input"
                id="isAuthorForeignNo"
              />
              <label className="form-check-label" htmlFor="isAuthorForeignNo">
                No
              </label>
            </div>
            {errors.is_author_foreign && (
              <div className="invalid-feedback d-block">
                This field is required
              </div>
            )}
          </div>
        </div>

        <div className="nav-buttons d-flex justify-content-between">
          <button
            type="button"
            onClick={handlePrev}
            className="btn btn-success"
          >
            Prev
          </button>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Authors;
