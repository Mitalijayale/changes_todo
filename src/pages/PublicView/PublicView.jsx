import "bootstrap/dist/css/bootstrap.min.css";
import "./PublicView.css";
import img from "../../assets/john.jpg";
import OffCan from "../../components/CommittiesInfo/Offcan";

export default function PublicView(props) {
  // const [data, manageData] = useState({});
  const data = {
    academicYears: [
      "2021-2022",
      "2021-2022",
      "2021-2022",
      "2021-2022",
      "2021-2022",
    ],
  };

  const committeeData = {
    name: "Falana Dhimkana Committee",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat incidunt nesciunt assumenda quisquam quasi ratione facilis, consequuntur nobis eius sapiente ducimus! Natus repellendus provident quae non id ex minima obcaecati?",
    members: [
      {
        staffId: "1",
        name: "Mitali Jayale",
        designation: "Head",
        photo: "",
        linkedIn: "linkedin.com",
      },
      {
        staffId: "2",
        name: "Mitali Jayale",
        designation: "Head",
        photo: "",
        linkedIn: "linkedin.com",
      },
      {
        staffId: "3",
        name: "Mitali Jayale",
        designation: "Head",
        photo: "",
        linkedIn: "linkedin.com",
      },
      {
        staffId: "4",
        name: "Mitali Jayale",
        designation: "Head",
        photo: "",
        linkedIn: "linkedin.com",
      },
      {
        staffId: "5",
        name: "Mitali Jayale",
        designation: "Head",
        photo: "",
        linkedIn: "linkedin.com",
      },
      {
        staffId: "6",
        name: "Mitali Jayale",
        designation: "Head",
        photo: "",
        linkedIn: "linkedin.com",
      },
      {
        staffId: "7",
        name: "Mitali Jayale",
        designation: "Head",
        photo: "",
        linkedIn: "linkedin.com",
      },
    ],
  };

  return (
    <>
      {/* main parent container */}
      <div className="container-lg  mt-4">
        {/* Search and filter controls */}
        <div className="row g-2">
          {/* Academic Year Dropdown */}
          <div className="col-sm-3 col-md-3">
            <select
              name="acyears"
              id="acyears"
              className="form-control input fw-normal"
            >
              <option value="" disabled selected>
                Filter by academic year
              </option>
              {data.academicYears.map((acyear) => (
                <option value={acyear}>{acyear}</option>
              ))}
            </select>
          </div>

          <div className="col-sm-7">
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search committee name"
              className="form-control input fw-normal"
              list="committee"
            />

            <datalist id="committee">
              <option value="PDA"></option>
              <option value="Addiction"></option>
              <option value="Web Dev"></option>
              <option value="Timepass"></option>
            </datalist>
          </div>

          {/* Search btn */}
          <div className="col-sm-2">
            <button
              className="btn align-items-center btn-primary btn-group-sm form-control"
              onClick={() => alert("Next time I'll display the data !")}
            >
              Search
            </button>
          </div>
        </div>

        {/* No data control */}
        <NoData />
        {/* Card controls */}

        <div className="card-parent mt-4">
          <div className="row g-2">
            <div className="col-sm-6 col-md-6">
              <Card />
            </div>
            <div className="col-sm-6 col-md-6">
              <Card />
            </div>
            <div className="col-sm-6 col-md-6">
              <Card />
            </div>
            <div className="col-sm-6 col-md-6">
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Card(props) {
  return (
    <>
      <div className="card m-1 px-4 py-2">
        <p className="committee-name p-0 py-3 bold h5 m-0">
          Name of the committee
        </p>
        <p className="committee-description text-justify p-0 m-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          libero perspiciatis quo perferendis labore laudantium iure dolores?
          Porro optio ut harum tenetur corrupti eveniet! Quisquam nulla nemo hic
          sapiente dolorem?
        </p>
        <p className="members-text h6 p-0 m-0 py-3 fw-semibold ">Members</p>

        {/* member image nd details */}
        <div className="member-component row gap-3 justify-content-around  ">
          <MemberComponent />
          <MemberComponent />
          <MemberComponent />
          <MemberComponent />
          <MemberComponent />
          <MemberComponent />
          <MemberComponent />
        </div>

        <div className="row justify-content-end mt-3 mb-2">
          <div className="col-auto">
            <OffCan />
          </div>
        </div>
      </div>
    </>
  );
}

function NoData(props) {
  return (
    <div className="container h-100 w-100 d-none">
      <h3>No Data So Far</h3>
    </div>
  );
}

function UserImage(props) {
  return (
    <img
      src={img}
      alt=""
      srcset=""
      style={{ width: "60px", borderRadius: "50%", marginRight: "10px" }}
    />
  );
}

function MemberComponent(props) {
  return (
    <div
      className="member flex-sm-row text-center text-sm-start col-auto "
      style={{ width: "" }}
    >
      <div className="">
        <UserImage />
      </div>
      <div className="member-details justify-content-center align-items-center m-sm-0 mt-2">
        <p className="member-name p-0 m-0 h6 fw-semibold fs-6 ">Jhon Doeeee</p>
        <p className="member-designation p-0 m-0 fw-">Principal</p>
      </div>
    </div>
  );
}
