import React, { useEffect, useState } from "react";
import "../StyleSheet/Profile.css";

import { useAuth } from "../context/AuthProvider";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../config/Firebase";

import UserInfo from "../components/User/Profile/UserInfo.jsx";
import Statistics from "../components/User/Profile/Statistics.jsx";
import Achievements from "../components/User/Profile/Achievments.jsx";
import Header from "../components/User/Header.jsx";

const Profile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  const [stats, setStats] = useState({
    created: 0,

    participated: 0,

    registered: 0,

    nextQuiz: null,

    highest: 0,

    gold: 0,

    silver: 0,

    bronze: 0,
  });

  useEffect(() => {
    if (!user) return;

    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    // user details

    const userSnap = await getDoc(doc(db, "users", user.uid));

    setProfile(userSnap.data());

    // quizzes created

    const createdSnap = await getDocs(
      query(
        collection(db, "quizzes"),

        where("authorId", "==", user.uid)
      )
    );

    const created = createdSnap.size;

    // request quiz

    const requestSnap = await getDocs(
      collection(
        db,

        "users",

        user.uid,

        "requestQuiz"
      )
    );

    let participated = 0;

    let registered = 0;

    let nextQuiz = null;

    requestSnap.forEach((doc) => {
      const data = doc.data();

      if (data.status === "accepted") {
        registered++;

        if (!nextQuiz) {
          nextQuiz = data.startTime;
        }
      }

      if (data.status === "attempted") {
        participated++;
      }
    });

    // attempts

    const attemptSnap = await getDocs(
      query(
        collection(db, "attempts"),

        where("userId", "==", user.uid)
      )
    );

    let highest = 0;

    let gold = 0;

    let silver = 0;

    let bronze = 0;

    attemptSnap.forEach((doc) => {
      const p = doc.data().percentage;

      highest = Math.max(highest, p);

      if (p >= 95) gold++;

      else if (p >= 90) silver++;

      else if (p >= 85) bronze++;
    });

    setStats({
      created,

      participated,

      registered,

      nextQuiz,

      highest,

      gold,

      silver,

      bronze,
    });
  };

  if (!profile) return <h2>Loading...</h2>;

  return (
    <>
      <Header />
      <div className="profile-page">
        <UserInfo profile={profile} stats={stats} />

        <Statistics highest={stats.highest} />

        <Achievements stats={stats} />
      </div>
    </>
  );
};

export default Profile;
