
import "./Dashboard.css"
const Dashboard = ({ classroomData }) => {
    return (
      <div className="Dashboard">
        <h1>{classroomData.name} Dashboard</h1>
        <h2>Join Code: {classroomData.joinCode}</h2>
      </div>
    );
  };

  export default Dashboard;