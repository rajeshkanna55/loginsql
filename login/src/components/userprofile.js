import React from 'react';
import UserProfileEdit from './userProfileEdit';
import Changepassword from './changepassword';

const MyComponent = ({choice,formdata,setFormdata,save,validation}) => {
  let content;

  switch (choice) {
    case 'Edit':
      content = (
        <div>
         <UserProfileEdit formdata={formdata} setFormdata={setFormdata} save={save} validation={validation}/>
        </div>
      );
      break;
    case 'Change':
      content = (
        <div>
         <Changepassword/>
        </div>
      );
      break;
    default:
      content = (
        <div>
            <p>This is My Log</p>
        </div>
      )
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default MyComponent;