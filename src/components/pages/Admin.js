import React, { Fragment, useState, useEffect } from 'react';
import QuestionForm from '../questions/auth/QuestionForm';
import QuestionFilter from '../questions/QuestionFilter';
import AdminViewQuestions from '../admin/Questions';
import {useAuth} from '../../context/auth/AuthState'
import Spinner from '../layout/Spinner'

import {
    useQuestions,
  } from '../../context/question/QuestionState';

const Admin = () => {
    const [spinner, setSpinner] = useState(true);

    // We just need authState, so autState is at index 0
  const authState = useAuth()[0];
  const { user } = authState;

  const questionState = useQuestions()[0];

  const {current} = questionState;

  useEffect(() => {
    setTimeout(() => {
        setSpinner(false);
      }, 3000);
  }, [spinner]);

const adminPage = (
<Fragment> 
                    <div className="row mt-10">
                <div className="col">
                    <ul className="nav nav-tabs nav-fill mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link active"
                                id="ex2-tab-1"
                                data-mdb-toggle="tab"
                                href="#ex2-tabs-1"
                                role="tab"
                                aria-controls="ex2-tabs-1"
                                aria-selected="true"
                            >Users</a
                            >
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                id="ex2-tab-2"
                                data-mdb-toggle="tab"
                                href="#ex2-tabs-2"
                                role="tab"
                                aria-controls="ex2-tabs-2"
                                aria-selected="false"
                            >Questions</a
                            >
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                id="ex2-tab-3"
                                data-mdb-toggle="tab"
                                href="#ex2-tabs-3"
                                role="tab"
                                aria-controls="ex2-tabs-3"
                                aria-selected="false"
                            >Comments</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
            <div className="tab-content" id="ex2-content">
                <div
                    className="tab-pane fade show active"
                    id="ex2-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex2-tab-1"
                >
                    Tab 1 content
                </div>
                <div
                    className="tab-pane fade"
                    id="ex2-tabs-2"
                    role="tabpanel"
                    aria-labelledby="ex2-tab-2"
                >
                   <div className='row'>
       {current !== null ? (<Fragment>
        <div className='col-xl-6 col-md-6 mb-4'>
           <QuestionForm />
         </div>
         <div className='col-xl-6 col-md-6 mb-4'>
        <h3 className='text-center mt-5'>Posted Questions</h3>
        <QuestionFilter />
        <AdminViewQuestions />
      </div>

       </Fragment>
          
         
       ):
       <div className='col-xl-12 col-md-12 mb-4'>
       <h3 className='text-center mt-5'>Posted Questions</h3>
       <QuestionFilter />
       <AdminViewQuestions />
     </div>}                
      
     
    </div>
                </div>
                <div
                    className="tab-pane fade"
                    id="ex2-tabs-3"
                    role="tabpanel"
                    aria-labelledby="ex2-tab-3"
                >
                    Tab 3 content
                </div>
            </div>
                </Fragment>
) 

const noAdminPage = (
    <Fragment> 
                <h1 className='text-center text-danger mt-5'>Access Restricted</h1>
                 </Fragment>
)


    return (
        <Fragment >
        {spinner ? (
        <Spinner />
      ) : (
<Fragment>
            {user && user.data.role !== 'admin' ? noAdminPage : adminPage}
            
        </Fragment>
      )}
        </Fragment>
        
        
    )
}

export default Admin;
