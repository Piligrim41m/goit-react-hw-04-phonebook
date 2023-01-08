import PropTypes from 'prop-types'
import css from './Contact.module.css'

function Contact({ name, number, onDeleteContact, contactId }) {
  return (
    <>
      <div className={css.wrapper}>
        <p className={css.dataContact}>{name} - <span className={css.number}>{number}</span></p>
        <button
          className={css.button}
          type="button"
          onClick={() => onDeleteContact(contactId)}
        >
                  {/* <FaTrash /> */}
                  Delete contact
        </button>
      </div>
    </>
  );
}

Contact.prototype = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default Contact;