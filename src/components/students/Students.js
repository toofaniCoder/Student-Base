import React from "react";
import Avatar from "../layout/Avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useFirestoreConnect } from "react-redux-firebase";
import Loading from "../layout/Loading";

const Students = () => {
  const firestore = useFirestore();
  const students = useSelector((state) => state.firestore.ordered.students);

  useFirestoreConnect([
    { collection: "students", orderBy: ["createdAt", "desc"] },
  ]);

  if (!students) {
    return <Loading />;
  }

  const deleteStudent = async (id) => {
    try {
      await firestore.collection("students").doc(id).delete();
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          {students.map((student, index) => (
            <div className="col-lg-3 col-md-6 mb-4" key={student.id}>
              <div className="card shadow text-center py-4">
                <Avatar url={`https://i.pravatar.cc/150?img=${index}`} />
                <div className="card-body">
                  <h5 className="card-title mb-0">{student.name}</h5>
                  <p className="text-muted small">{student.email}</p>
                  <Link
                    to={`/student/${student.id}`}
                    className="btn btn-primary btn-profile"
                  >
                    View Profile
                  </Link>
                  <button
                    className="btn btn-edit"
                    onClick={() => deleteStudent(student.id)}
                  >
                    <span className="material-icons">delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students;
