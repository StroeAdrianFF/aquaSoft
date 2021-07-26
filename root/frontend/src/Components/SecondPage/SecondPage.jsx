import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjects, addProject, updateProject, deleteProject } from '../../actions/project';
import styles from './SecondPage.module.css';

const mapStateToProps = (state) => ({
    //access state variables
    projects: state.project.projects
});

const SecondPage = (props) => {
    const [projectData, setProjectData] = useState({});
    const [projectData2, setProjectData2] = useState({});
    const [projectData3, setProjectData3] = useState({});

    const getData = () => {
        props.getProjects();
    };

    const onChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };
    const onChange2 = (e) => {
        setProjectData2({ ...projectData2, [e.target.name]: e.target.value });
    };
    const onChange3 = (e) => {
        setProjectData3({ ...projectData3, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.bg}>
            {/* LOAD PROJECTS */}
            GET
            <button onClick={getData}>LOAD ME BIATCH</button>
            {props.projects.length > 0 && props.projects.map((project) => <p key={project._id}>{project.project_name}</p>)}
            {/* ADD NEW PROJECT */}
            ADD
            <input type='text' name='project_name' onChange={onChange} />
            <input type='text' name='start_date' onChange={onChange} />
            <input type='text' name='planned_end_date' onChange={onChange} />
            <input type='text' name='description' onChange={onChange} />
            <input type='text' name='project_code' onChange={onChange} />
            <button onClick={() => props.addProject(projectData)}>test</button>
            {/* UPDATE PROJECT */}
            UPDATE
            <input type='text' name='_id' onChange={onChange2} />
            <input type='text' name='project_name' onChange={onChange2} />
            <input type='text' name='start_date' onChange={onChange2} />
            <input type='text' name='planned_end_date' onChange={onChange2} />
            <input type='text' name='description' onChange={onChange2} />
            <input type='text' name='project_code' onChange={onChange2} />
            <button onClick={() => props.updateProject(projectData2)}>test</button>
            {/* DELETE PROJECT */}
            DELETE
            <input type='text' name='_id' onChange={onChange3} />
            <button onClick={() => props.deleteProject(projectData3)}>test</button>
        </div>
    );
};

SecondPage.propTypes = {
    projects: PropTypes.array //declare the data structure of the variable wanted
};

export default connect(mapStateToProps, { getProjects, addProject, updateProject, deleteProject })(SecondPage);
