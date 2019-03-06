import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PlannerArea from '../components/Planner/PlannerArea';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PlanList from '../components/PlanList/PlanList';
import FavouriteBtn from '../components/FavouriteBtn/FavouriteBtn';
import BackdropButton from '../components/BackdropButton/BackdropButton';
import OptimizeBtn from '../components/OptimizeBtn/OptimizeBtn'; 
import WarningSummary from '../components/WarningSummary/WarningSummary';
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
        byId: {},
        allIds: []
      },
      terms: {
        byId: {},
        allIds: []
      },
      courses: {
        byId: {},
        allIds: []
      },
      name: "test",
      specialization: {},
      description: "",
      isFavourite: false,
      id: 1
    },
    user: {
      name: "test",
      standing: 0
    },
    warnings: [],
    planList: []
  }

  openCourseListSidebar = () => {
    this.setState({ isCourseListOpen : true });
  }

  closeCourseListSidebar = () => {
    this.setState({ isCourseListOpen: false });
  }

  optimizeHandler = () => {
    console.log("Optimize button clicked");
    //optimize button logic goes here
  }

  toggleFavourite = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        currentPlan: {
          ...prevState.currentPlan,
          isFavourite: !prevState.currentPlan.isFavourite
        }
      };
    });
  }

  createPlanHandler = () => {
    this.props.history.push('/degree-year-selection');
  }

  setWarnings = (warnings) => {
    this.setState({
      warnings: warnings
    });
  }

  updatePlan = (plan) => {
    this.setState({ currentPlan: plan });
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        currentPlan: {
          ...prevState.currentPlan,
          name: name
        }
      };
    });
  }

  onDescriptionChange = (e) => {
    const desc = e.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        currentPlan: {
          ...prevState.currentPlan,
          description: desc
        }
      };
    });
  }

  showSnackbar = () => {
    this.setState({ showSnackbar: true });
  }

  closeSnackbar = () => {
    this.setState({ showSnackbar: false });
  }

  savePlan = async () => {
    const response = await axios.post(`/api/plans/${this.state.currentPlan.id}/save`, {plan: this.state.currentPlan});
    console.log(response.data);
  }

  loadPlan = async (planId) => {
    await this.savePlan();
    console.log(planId);
    const response = await axios.get(`/api/plans/${planId}`);
    const plan = response.data;
    console.log(plan);
    if (plan.length > 0) {
      this.setState({currentPlan: plan});
    }
  }

  componentDidUpdate = async () => {
    await this.savePlan();
  }

  componentDidMount = async () => {
    const userId = sessionStorage.getItem("userId");
    const userResponse = await axios.get(`/api/users/${userId}`);
    const user = userResponse.data;
    console.log({"current user": user});
    this.setState({
      user: user
    });
    const planResponse = await axios.get(`/api/plans/user/${user.id}`);
    console.log({plans: planResponse.data});
    this.setState({planList: planResponse.data});
  }

  render() {
    return (
      <div id="main">
        <StudentInfo user={this.state.user}/>
        <PlanList plans={this.state.planList} loadPlan={this.loadPlan}/>
        <NoteArea onChange={this.onDescriptionChange}>{this.state.currentPlan.description}</NoteArea>
        <PlannerHeader onTitleChange={this.onNameChange} title={this.state.currentPlan.name}>
          <FavouriteBtn isFavourite={this.state.currentPlan.isFavourite} onClick={this.toggleFavourite}/>
          <OptimizeBtn click={this.optimizeHandler}/>
          <WarningSummary click={this.showSnackbar} numberOfWarnings={this.state.warnings.length} user={this.state.user} />
          <BackdropButton open={this.openCourseListSidebar} close={this.closeCourseListSidebar} isOpen={this.state.isCourseListOpen}/>
        </PlannerHeader>
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

Main.propTypes = {
  history: PropTypes.object
};

export default Main;