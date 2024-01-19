const cron = require('cron');
const nodemailer = require('nodemailer');

// Define the cron job to execute on the 10th day of every month at 8:00 AM
const emailCronJob = new cron.CronJob('0 8 9 * *', async () => {
  try {
    const d = new Date();
    const monthArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const currentMonth = monthArray[d.getMonth()];
  
    let month;
    switch (currentMonth) {
      case 'Jan':
        month = Jan;
        break;
      case 'Feb':
        month = Feb;
        break;
        case 'March':
          month = March;
          break;
          case 'April':
            month = April;
            break;
            case 'May':
              month = May;
              break;
              case 'June':
                month = June;
                break;
                case 'July':
                  month = July;
                  break;
                  
                  case 'Aug':
                    month = Aug;
                    break;
                    case 'Sept':
                      month = Sept;
                      break;
                      case 'Oct':
                      month = Oct;
                      break;
                      case 'Nov':
                      month = Nov;
                      break;
                      case 'Dec':
                      month = Dec;
                      break;
      // Add cases for other months as needed
      default:
        // Handle the case where the current month doesn't have a corresponding class
        res.redirect("/error");
        return;
month.find({})
    // Implement the logic to check the database for users who haven't submitted fees

    // For each user who hasn't submitted fees, send a reminder email
    // using nodemailer
    const transporter = nodemailer.createTransport({

                    











      // Configure your email transport (e.g., Gmail or SendGrid)
    });

    // Send the reminder email to each user
    // Replace `to` with the email address of the user
    const mailOptions = {
      from: 'your_email@example.com', // Replace with your email address
      to: 'user@example.com', // Replace with the user's email address
      subject: 'Reminder: Fee Submission', // Email subject
      text: 'Please submit your fees as soon as possible.', // Email body
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

// Start the cron job
emailCronJob.start();
