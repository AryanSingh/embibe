import React from 'react';
import { connect } from 'react-redux';
import { getData } from '../actions';
import StudentCard from '../components/StudentCard';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getData();
    console.log('props', this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      console.log('data', this.props.data);
    }
  }

  renderStudents = (students) => {
    if (students) {
      console.log('students', students);
      return students.map((student) => {
        return <StudentCard student={student} id={student.student_id} />;
      });
    }
    return;
  };

  render() {
    return <div>{this.renderStudents(this.props.data)}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = {
  getData: getData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
