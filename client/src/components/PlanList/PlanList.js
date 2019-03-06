import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlanList.css';

class PlanList extends Component {
  render() {
    console.log(this.props.plans);

    const favouritePlans = this.props.plans
      .filter(plan => plan.isFavourite === true)
      .map((plan) => <li onClick={() => {this.props.loadPlan(plan.id);}} className="plan-list-item favourite" key={plan.id}>{plan.title}</li>);

    const nonfavouritePlans = this.props.plans
      .filter(plan => plan.isFavourite === false)
      .map((plan) => <li onClick={() => {this.props.loadPlan(plan.id);}} className="plan-list-item" key={plan.id}>{plan.title}</li>);

    return (
      <div id="plan-list">
        <div className="sidebar-info-area">
          <h3 className="sidebar-header">Degree Plans</h3>
          <h4 className="sidebar-header">Favourites</h4>
          <ul>
            {favouritePlans}
          </ul>
          <h4 className="sidebar-header">Plans</h4>
          <ul>
            {nonfavouritePlans}
          </ul>
        </div>
      </div>
    );
  }
}

PlanList.propTypes = {
  plans: PropTypes.array,
  loadPlan: PropTypes.func.isRequired
};

export default PlanList;