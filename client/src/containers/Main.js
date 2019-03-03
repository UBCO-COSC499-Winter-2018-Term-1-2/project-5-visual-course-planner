import React, { Component } from 'react';
import PlannerArea from '../components/Planner/PlannerArea';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PlanList from '../components/PlanList/PlanList';
import './Main.css';
import NoteArea from '../components/Notes/NoteArea';
import { library } from '@fortawesome/fontawesome-svg-core';
import PlannerHeader from '../components/PlannerHeader/PlannerHeader';
import { faSignOutAlt, faHeart, faExclamationTriangle, faPlus, faTimes, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// Font Awesome Icon Imports
library.add(faSignOutAlt,faHeart, faExclamationTriangle, faPlus, faTimes, faTrash, faPlusCircle);

class Main extends Component {
  state = {
    isCourseListOpen: false,
    showSnackbar : false,
    currentPlan: {
      sessions: {
        byId: {
          "1": {
            year: "2018",
            season: "W",
            terms: [ "1" ]
          }
        },
        allIds: [ "1" ]
      },
      terms: {
        byId: {
          "1": {
            session: "0",
            number: 1,
            courses: [ "100" ]
          }
        },
        allIds: [ "1" ]
      },
      courses: {
        byId: {
          "100": {
            code: "COSC 222",
            standingRequirement: 2,
            term: "0",
            coRequisites: [],
            preRequisites: []
          }
        },
        allIds: [ "100" ]
      },
      id: 0,
      name: "My Plan",
      specialization: {
        id: 1,
        name: "Major in Computer Science"
      }
    },
    user: {
      name: "Leonardo",
      yearStanding: 1
    },
    warnings: []
  }

  openCourseListSidebar = () => {
    this.setState({ isCourseListOpen : true });
  }

  closeCourseListSidebar = () => {
    this.setState({ isCourseListOpen: false });
  };

  optimizeHandler = () => {
    console.log("Optimize button clicked");
    //optimize button logic goes here
  }

  setNumberOfWarnings = (number) => {
    this.setState({numberOfWarnings: number});
  }

  setWarnings = (warnings) => {
    this.setState({
      warnings: warnings
    });
  }

  updatePlan = (plan) => {
    this.setState({ currentPlan: plan });
  }

  showSnackbar = () => {
    this.setState({ showSnackbar: true });
  }

  closeSnackbar = () => {
    this.setState({ showSnackbar: false });
  }

  render() {
    return (
      <div id="main">
        <StudentInfo user={this.state.user}/>
        <PlanList/>
        <NoteArea/>
        <PlannerHeader
          planName={this.state.currentPlan.name}
          openCourseList={this.openCourseListSidebar}
          closeCourseList={this.closeCourseListSidebar}
          isCourseListOpen={this.state.isCourseListOpen}
          optimize={this.optimizeHandler}
          showWarning={this.showSnackbar}
          numberOfWarnings={this.state.warnings.length}
          user={this.state.user}
        />
        <PlannerArea
          isCourseListOpen={this.state.isCourseListOpen}
          closeCourseList={this.closeCourseListSidebar}
          plan={this.state.currentPlan}
          user={this.state.user}
          updatePlan={this.updatePlan}
          showSnackbar={this.state.showSnackbar}
          closeSnackbar={this.closeSnackbar}
          warnings={this.state.warnings}
          setWarnings={this.setWarnings}
        />    
      </div>
    );
  }
}

export default Main;