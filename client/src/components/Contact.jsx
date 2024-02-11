import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  console.log(landlord, "value in landlord");

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact{" "}
            <span className="font-semibold">
              {landlord.rest.username} for{" "}
              <span>{listing.name.toLowerCase()}</span>
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            className="w-full border p-3 rounded-lg"
            rows="2"
            onChange={onChangeMessage}
            placeholder="Message"
          ></textarea>
          <Link
            to={`mailto:${landlord.rest.email}?subject=Regarding ${listing.name}body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Sent Message
          </Link>
        </div>
      )}
    </>
  );
};

// Define prop types validation for listing
Contact.propTypes = {
  listing: PropTypes.shape({
    userRef: PropTypes.string.isRequired, // Assuming userRef is a required string
    name: PropTypes.string.isRequired, // Adding name property validation
    // Add other properties if needed
  }).isRequired,
};

export default Contact;
