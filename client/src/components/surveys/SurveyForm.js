import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {
    renderFields() {
        return (
            formFields.map((field, id) => <Field key={id} component={SurveyField} type="text" label={field.label} name={field.name} />)
        )
    }

    render(){
        return (
            <div>
                <h5>Please add the survey content</h5>
                <div className="row">
                    <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                        {this.renderFields()}
                        <Link to="/surveys" className="red btn-flat left white-text">
                            Cancel
                        </Link>
                        <button type="submit" className="teal btn-flat right white-text">
                            Next
                            <i className="material-icons right">done</i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

function validate(values){
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    formFields.forEach(({name}) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value'
        }
    })

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);