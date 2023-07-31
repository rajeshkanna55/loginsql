import React from 'react';
import UserProfileEdit from './userProfileEdit';
import Changepassword from './changepassword';

const MyComponent = ({ choice }) => {
  let content;

  switch (choice) {
    case 'Edit':
      content = (
        <div>
         <UserProfileEdit/>
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