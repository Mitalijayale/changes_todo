import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Members.module.css";
import member1Image from "./member1.png";
import member2Image from "./member2.png";
import member3Image from "./member3.png";
import member4Image from "./member4.png";

function Members() {
  return (
    <div className="row">
      {/* Pair 1 */}
      <div className={`${style.memberContainer}`}>
        <div className="card" style={{ border: "2px solid #c4c3c3" }}>
          <div className="card-body ">
            <h5 className="card-title">Name of the committee</h5>
            <p className="card-text">
             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit pariatur quaerat nam natus, ullam in optio dolores cumque doloremque consectetur qui id numquam officia, atque delectus? Ad, et cupiditate? Tempore ex quas laborum sequi doloremque aperiam quibusdam sapiente inventore at consequatur! Sapiente tempora vel qui vero, illo non dolore itaque aliquid nam corrupti quo doloremque optio cum voluptatem minima praesentium harum ratione ipsam quaerat? Quos, explicabo illum? Dolore sapiente illo, repudiandae cumque cupiditate ratione reiciendis quos, fugit fugiat beatae, maxime consequatur autem natus temporibus tenetur expedita perferendis! Aliquid deserunt nam cupiditate at libero ab aut. Laboriosam quam fugit corrupti consequatur.
            </p>
            <h5 className="card-title ">Members</h5>
            <div className="container overflow-hidden text-center">
              <div className="row">
                <div className={`col-6 ${style.customProfileCol}`}>
                  <div className=" memb mr-5">
                    <img
                      src={member1Image}
                      alt="Member 1"
                      className={`${style.profileImage} rounded-circle`}
                    />
                    <p className="m-1">Member 1</p>
                    <p>Role or Studies 1</p>
                  </div>
                </div>
                <div className={`col-6 ${style.customProfileCol}`}>
                  <div className="p-0 ">
                    <img
                      src={member2Image}
                      alt="Member 2"
                      className={`${style.profileImage} rounded-circle`}
                    />
                    <p className="m-1">Member 2</p>
                    <p>Role or Studies 2</p>
                  </div>
                </div>
                <div className={`col-6 ${style.customProfileCol}`}>
                  <div className="p-0">
                    <img
                      src={member3Image}
                      alt="Member 1"
                      className={`${style.profileImage} rounded-circle`}
                    />
                    <p className="m-1">Member 1</p>
                    <p>Role or Studies 1</p>
                  </div>
                </div>
                <div className={`col-6 ${style.customProfileCol}`}>
                  <div className="p-0 ">
                    <img
                      src={member4Image}
                      alt="Member 2"
                      className={`${style.profileImage} rounded-circle`}
                    />
                    <p className="m-1">Member 2</p>
                    <p>Role or Studies 2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Members;
