// pages/about.js
import Image from 'next/image';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO',
    imageUrl: '/images/john-doe.jpg',
    bio: 'John has over 20 years of experience in the industry and is the driving force behind our success.'
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    imageUrl: '/images/jane-smith.jpg',
    bio: 'Jane is a tech visionary with a passion for developing innovative solutions.'
  },
  // Add more team members as needed
];

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="mb-8">
        Welcome to Our Company! We are committed to delivering the best products and services to our customers.
        Our team of experienced professionals is dedicated to achieving excellence in every project we undertake.
      </p>
      <h2 className="text-3xl font-semibold mb-4">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg">
            <Image
              src={member.imageUrl}
              alt={`${member.name}'s picture`}
              width={150}
              height={150}
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-gray-700">{member.role}</p>
            <p className="mt-2">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
