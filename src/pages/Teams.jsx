import React from 'react';
import TeamsComponent from '../components/TeamsComponent';
import pic1 from '../assets/Abhishek_Kumar.png';
import pic2 from '../assets/Isabella.jpg';
import pic3 from '../assets/Deepak_Mishra.jpg';
import pic4 from '../assets/Chintan.jpg';
import pic5 from '../assets/Ranganadh.jpg';
import pic6 from '../assets/Abhishek_C.jpg';

const teamMembers = [
    {
        role: 'Project PI',
        name: 'Dr. Deepak R. Mishra',
        imgUrl: pic3,
        linkedinUrl: 'https://geography.uga.edu/directory/people/deepak-r-mishra',
        description: "Dr. Deepak Mishra is a professor and the Associate Head of Geography at UGA, leading the Small Satellite Research Lab. He's an expert in remote sensing, applying his knowledge to studying water resources, wetlands, and environmental issues. Combining field-based and satellite techniques with AI, Dr. Mishra is at the forefront of using innovative technologies to understand our planet."
    },
    {
        role: 'Current Team Members',   // Adding the Current Team Members
        members: [
            {
                name: 'Abhishek Kumar',
                imgUrl: pic1,
                linkedinUrl: 'https://www.linkedin.com/in/abhishek-kumar-49348b143/',
                description: "Postdoctoral Associate"
            },
           
            {
                name:'Chintan B. Maniyar',
                imgUrl: pic4,
                linkedinUrl: 'https://chintan2108.github.io/',
                description: "PhD Student"
            },
            {
                name: 'Isabella Fiorentino',
                imgUrl: pic2,
                linkedinUrl: 'https://www.linkedin.com/in/isabella-fiorentino-113049188/',
                description: "MS Student"
            },
            {
                name:'Abhishek Cherukuru',
                imgUrl: pic6,
                linkedinUrl: 'https://www.linkedin.com/in/abhishek-cherukuru/',
                description: "Web Developer"
            },
            {
                name: 'Ranganadh Srivilli',
                imgUrl: pic5,
                linkedinUrl: 'https://www.linkedin.com/in/ranganadhsrivilli/',
                description: "Web Developer" 
            }
            

        ]
    },
    {
        role: 'Past Team Members',    // Add past team members here
        members: [
            'Dr. Lakshmish Ramaswamy',
            'Dr. Michael Scott',
            'Dr. Vinay Boddula',
            'Samual Weber',
            'Ben Page'
        ]
    }
];


const Teams=()=>
{

    return <>
    <div style={{ marginTop: '90px' }}>
        <TeamsComponent teamMembers={teamMembers}/>
    </div>
    </>
}
export default Teams;