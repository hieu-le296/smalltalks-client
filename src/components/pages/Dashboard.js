import Questions from '../questions/auth/Questions';
import QuestionForm from '../questions/auth/QuestionForm';
import QuestionFilter from '../questions/QuestionFilter';

const Dashboard = () => {
  return (
    <div className='row'>
      <div className='col-xl-6 col-md-6 mb-4'>
        <QuestionForm />
      </div>
      <div className='col-xl-6 col-md-6 mb-4'>
        <h3 className='text-center mt-5'>Your Posted Questions</h3>
        <QuestionFilter />
        <Questions />
      </div>
    </div>
  );
};

export default Dashboard;
