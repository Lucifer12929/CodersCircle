import React, { useContext, useEffect, useState } from "react";
import { IconButton, Link, LoadingButton, TextField } from "@pankod/refine-mui";
import { Button } from "@pankod/refine-mui";
import axios from "axios";

import style from "../css/components/Jobs.module.css";
import { TfiBag } from "react-icons/tfi";
import { toast } from "react-hot-toast";
import provider from "../config/axios";
import { FaRupeeSign } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { GoLocation } from "react-icons/go";
import { ContextProvider } from "../config/Context";
import jobdata from "../data/job";
import internshipdata from "../data/internship";

const ApiRevoke = () => {
  // const axios = require("axios");
  const [trigger, setTrigger] = useState(false);
  return (
    <div className={style.header_api}>
      <div className={style.top}>
        <p className={style.info}>Select your prefence here.</p>
        <div className={style.switch_button}>
          <input
            className={style.switch_button_checkbox}
            type="checkbox"
            onClick={() => setTrigger(!trigger)}
          ></input>
          <label className={style.switch_button_label} for="">
            <span className={style.switch_button_label_span}>Jobs</span>
          </label>
        </div>
      </div>
      <div className={style.cards}>
        {trigger ? (
          <>
            {internshipdata.map((item) => (
              <Link href={item.link}>
                <div className={style.card}>
                  <div className={style.cardtop}>
                    <div className={style.logo}>
                      <h3>{item.role}</h3>
                      <div className={style.compdetail}>
                        <h4>{item.company}</h4>
                        <h5> {item.reviews} reviews</h5>
                      </div>
                    </div>
                    <img src={item.logo} />
                  </div>

                  <div className={style.cardmiddle}>
                    <div className={style.m1}>
                      <div className={style.m2}>
                        <TfiBag />
                        <p>{item.experience} years</p>
                      </div>
                      <div className={style.m2}>
                        <FaRupeeSign />
                        <p>{item.salary} Lpa</p>
                      </div>
                      <div className={style.m2}>
                        <GoLocation />
                        <p>{item.location}</p>
                      </div>
                    </div>
                    <div className={style.m3}>
                      <CgNotes className={style.descicon} />
                      <p>{item.desc}</p>
                    </div>
                    <div className={style.tagstyle}>
                      {item.skills.map((tags) => (
                        <p>{tags}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            {jobdata.map((item) => (
              <Link href={item.link}>
                <div className={style.card}>
                  <div className={style.cardtop}>
                    <div className={style.logo}>
                      <h3>{item.role}</h3>
                      <div className={style.compdetail}>
                        <h4>{item.company}</h4>
                        <h5> {item.reviews} reviews</h5>
                      </div>
                    </div>
                    <img src={item.logo} />
                  </div>

                  <div className={style.cardmiddle}>
                    <div className={style.m1}>
                      <div className={style.m2}>
                        <TfiBag />
                        <p>{item.experience} years</p>
                      </div>
                      <div className={style.m2}>
                        <FaRupeeSign />
                        <p>{item.salary} Lpa</p>
                      </div>
                      <div className={style.m2}>
                        <GoLocation />
                        <p>{item.location}</p>
                      </div>
                    </div>
                    <div className={style.m3}>
                      <CgNotes className={style.descicon} />
                      <p>{item.desc}</p>
                    </div>
                    <div className={style.tagstyle}>
                      {item.skills.map((tags) => (
                        <p>{tags}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
        {/* {jobdata.map((item) => (
          <Link href={item.link}>
            <div className={style.card}>
              <div className={style.cardtop}>
                <div className={style.logo}>
                  <h3>{item.role}</h3>
                  <div className={style.compdetail}>
                    <h4>{item.company}</h4>
                    <h5> {item.reviews} reviews</h5>
                  </div>
                </div>
                <img src={item.logo} />
              </div>

              <div className={style.cardmiddle}>
                <div className={style.m1}>
                  <div className={style.m2}>
                    <TfiBag />
                    <p>{item.experience} years</p>
                  </div>
                  <div className={style.m2}>
                    <FaRupeeSign />
                    <p>{item.salary} Lpa</p>
                  </div>
                  <div className={style.m2}>
                    <GoLocation />
                    <p>{item.location}</p>
                  </div>
                </div>
                <div className={style.m3}>
                  <CgNotes className={style.descicon} />
                  <p>{item.desc}</p>
                </div>
                <div className={style.tagstyle}>
                  {item.skills.map((tags) => (
                    <p>{tags}</p>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))} */}
      </div>
    </div>
  );
};

export default ApiRevoke;
