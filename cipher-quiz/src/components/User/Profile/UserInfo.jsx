const UserInfo = ({ profile, stats }) => {
  return (
    <div className="left-panel">
      <div className="top-user">
        <img src={profile.photoURL} alt="profile" className="profile-image" />

        <div>
          <h2>{profile.name}</h2>

          <p>{profile.email}</p>
        </div>
      </div>

      <div className="stats-box">
        <p>Created : {stats.created}</p>

        <p>Participated : {stats.participated}</p>

        <p>Currently Registered : {stats.registered}</p>

        <p>
          Be Ready For :
          {stats.nextQuiz
            ? stats.nextQuiz.toDate().toLocaleString()
            : " No Upcoming Quiz"}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
