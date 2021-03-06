import React, { useContext } from 'react';
import { Form, Formik, Field } from 'formik';
import { Link } from 'react-router-dom';
import { CustomInput } from '.';
import { milestoneValidator, milestoneTitleOnlyValidator } from '../helpers';
import { submitButtonStyle } from '../styles';
import { habitContext } from '../contexts';
import swal from 'sweetalert2';
import { createNewMilestone } from '../services';

const submitMilestoneForm = async (
  { habitId, milestone },
  { setSubmitting, resetForm },
  cb
) => {
  try {
    const result = await createNewMilestone({ habitId, title: milestone });
    cb({ habitId, data: result.data });
    swal({
      type: 'success',
      position: 'top-end',
      title: 'Milestone added',
      toast: true,
      showConfirmButton: false,
      timer: 3000
    });
    resetForm();
  } catch (err) {
    swal({
      type: 'error',
      position: 'top-end',
      title: err.message,
      toast: true,
      showConfirmButton: false,
      timer: 3000
    });
  }
  setSubmitting(false);
};

const MilestonesForm = props => {
  const { habit, addMilestoneToHabit } = useContext(habitContext);

  const { habitId, name } = habit;

  const isHabitPage = props.location.pathname.includes('/habits/');

  const initialValues = isHabitPage
    ? { milestone: '' }
    : { habit: name, milestone: '' };

  return (
    <div className="card">
      {!isHabitPage && (
        <React.Fragment>
          <div className="card mb-3">
            <h1 className="text-center text-monospace">Add Milestones</h1>
          </div>
          <div>
            <Link to="/my-habits">
              <button
                type="button"
                className="btn ml-auto bg-secondary btn-sm"
                style={submitButtonStyle}
              >
                Go Back
              </button>
            </Link>
          </div>
        </React.Fragment>
      )}
      <div className="mt-3 mb-3">
        <Formik
          initialValues={initialValues}
          validate={values => {
            isHabitPage
              ? milestoneTitleOnlyValidator(values)
              : milestoneValidator(values);
          }}
          onSubmit={async ({ milestone }, { setSubmitting, resetForm }) => {
            submitMilestoneForm(
              { habitId: habitId || props.match.params.habitId, milestone },
              { setSubmitting, resetForm },
              addMilestoneToHabit
            );
          }}
        >
          {({ isSubmitting }) => (
            <Form
              className={
                isHabitPage
                  ? 'd-flex flex-row justify-content-between'
                  : 'd-flex align-items-center p-2'
              }
            >
              <React.Fragment>
                {!isHabitPage && (
                  <Field
                    type="text"
                    name="habit"
                    disabled
                    inputClass="form-group align-items-center mt-auto mb-auto"
                    style={{ minWidth: '400px' }}
                    placeholder="Habit Name"
                    component={CustomInput}
                  />
                )}
                <Field
                  type="test"
                  name="milestone"
                  inputClass="form-group align-items-center mt-auto mb-auto text-monospace ml-3"
                  style={
                    !isHabitPage ? { minWidth: '300px', marginLeft: '15px' }
                    : { minWidth: '35rem' }
                  }
                  placeholder={isHabitPage ? 'Add a new milestone' : 'milestone item'}
                  component={CustomInput}
                />
                <button
                  className='btn mr-3 bg-primary btn-sm'
                  type="submit"
                  disabled={isSubmitting}
                  style={submitButtonStyle}
                >
                  Add
                </button>
              </React.Fragment>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MilestonesForm;
