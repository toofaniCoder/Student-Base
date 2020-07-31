import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../layout/Input";
import { useFirestore } from "react-redux-firebase";

const StudentForm = () => {
  const firestore = useFirestore();

  let history = useHistory();
  const { id } = useParams();
  const docRef = id ? firestore.collection("students").doc(id) : null;

  const [student, setStudent] = useState({
    name: "",
    email: "",
    standard: "",
    phone: "",
    address1: "",
    address2: "",
  });

  useEffect(() => {
    if (id) {
      loadStudent();
    }
  }, [id]);

  const loadStudent = async () => {
    try {
      const result = await docRef.get();
      if (result.exists) {
        setStudent(result.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (id) {
      // update student
      try {
        await docRef.update({
          ...student,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      // add new student
      firestore
        .collection("students")
        .add({ ...student, createdAt: firestore.FieldValue.serverTimestamp() });
    }
    history.push("/");
  };
  return (
    <div className="container">
      <div className="py-4">
        <div className="row ">
          <div className="col-md-10 mx-auto">
            <div className="card card-body shadow">
              <form onSubmit={submitForm}>
                <div className="form-row form-group mb-4">
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Name"
                      name="name"
                      value={student.name}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student E-mail"
                      name="email"
                      value={student.email}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="form-row form-group mb-4">
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Phone"
                      name="phone"
                      value={student.phone}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Class"
                      name="standard"
                      value={student.standard}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="form-row form-group">
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Address Line 1"
                      name="address1"
                      value={student.address1}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Line 2"
                      name="address2"
                      value={student.address2}
                      onChange={onInputChange}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  {id ? "Update Student" : "Add Student"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
