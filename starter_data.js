/* 
  This allows you to populate some starter data
*/
var mongoURL = process.env.HEROKU ? process.env.MONGODB_URI : 'mongodb://localhost/diverso';
var mongoose = require('mongoose');
mongoose.connect(mongoURL);

var User = require('./schema/user.js');
var { Message } = require('./schema/message.js');
var strength_board = require('./resources/strength_board');

const list1 = [
  `<div class="bubbleBase programBubble relativePosition">I see! For this goal I want to recommond theory and practice related to <span style="font-family: 'Margarine';font-size: 13pt; font-color: #941F56">Symbolism</span>
  <div class="absoluteStart">
  </div>
  </div>
  `,
  `<div style="border-radius: 12px; background-color: #E0E0E0; font-color: #941F56; font-size: 13pt; padding: 16px;" class="generalJSXBubble relativePosition">Positive and empowering symbolism in your classroom is an important building block of a safe, inclusive, and engaged learning environment.
    <div class="absoluteStart">
      <svg width="48" height="48" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="46" cy="46" r="46" fill="#32C7BE"/>
      <ellipse cx="12.6735" cy="12.5952" rx="12.6735" ry="12.5952" transform="translate(32.6694 21.0293)" fill="white"/>
      <path d="M17.7429 0L33.1086 37.7857H2.37709L17.7429 0Z" transform="translate(27.6 31.1055)" fill="white"/>
      </svg>
    </div>
    </div>
  `,
  `<div style="border: 2px solid #2C3E99; margin-right: 10%;" class="flexRow generalJSXBubble relativePosition">
      <div style="flex: 1; coloc: white; background-color: #2C3E99; padding: 16px;">
        “My students are not very close. They seem to sit in clusters by race and ethnicity and I get the sense that some groups harbor biases against others. I wish I could help them feel a greater connection and appreciation for one another.”
      </div>
      <div style="flex: 1; padding: 16px;">
        One of the ways you can start fostering connection and appreciation between students is to model the way you want them to honor one another by using honorary and inclusive symbolism in the class that represents your diverse student identities. 
      </div>
      <div class="absoluteStart" style="left: -73px">
      <svg width="48" height="48" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="46" cy="46" r="46" fill="#32C7BE"/>
        <path d="M28.4505 9.32837C28.4505 13.6291 31.3135 17.203 35.1307 18.3539V25.9256H11.6904H6.6802V31.0138V38.5855C2.8033 39.6759 0 43.3103 0 47.611C0 52.7598 4.11548 57 9.24493 57C14.3147 57 18.4898 52.8204 18.4898 47.611C18.4898 43.3103 15.6269 39.7364 11.8096 38.5855V31.0138H35.3096H40.3198V25.9256V18.3539C44.1967 17.2635 47 13.6291 47 9.32837C46.9404 4.1796 42.7652 0 37.6954 0C32.6256 0 28.4505 4.1796 28.4505 9.32837ZM13.3604 47.611C13.3604 49.9734 11.5114 51.8512 9.18528 51.8512C6.85914 51.8512 5.01015 49.9734 5.01015 47.611C5.01015 45.2487 6.85914 43.3709 9.18528 43.3709C11.5114 43.3103 13.3604 45.2487 13.3604 47.611ZM41.8706 9.32837C41.8706 11.6908 40.0216 13.5685 37.6954 13.5685C35.3693 13.5685 33.5203 11.6908 33.5203 9.32837C33.5203 6.96599 35.3693 5.0882 37.6954 5.0882C40.0216 5.0882 41.8706 6.96599 41.8706 9.32837Z" transform="translate(75 22) rotate(90)" fill="white"/>
        </svg>
    </div>
    </div>
  `,
  `<div class="flexRow almostFull generalJSXBubble relativePosition" style="padding: 16px; border: 2px solid #941F56">
      <svg width="95" height="94" viewBox="0 0 95 94" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 160px; height: 160px;">
        <path d="M94.0211 45.7157C93.5911 60.9577 86.2061 75.2717 70.6221 84.8107C62.7341 89.6397 54.4521 92.8867 45.2161 93.1997C32.7241 93.6227 21.6521 90.3047 12.4161 80.8317C1.54308 69.6777 -2.08192 56.5507 1.12208 41.2247C5.36608 20.9207 17.9081 8.4067 36.2401 2.3147C48.4511 -1.7433 60.9501 -0.444297 72.2911 6.0437C85.7921 13.7687 93.0631 26.0357 94.0211 45.7157ZM41.4111 32.8697C41.7831 26.9497 40.5731 22.1137 41.2181 17.1887C41.7391 13.2117 40.9641 12.5377 37.2931 13.9577C25.5591 18.4987 17.0481 26.6577 13.8441 39.5107C11.6801 48.1927 12.0411 57.0137 17.1901 64.8867C19.2131 67.9797 19.6501 68.1477 22.4441 65.7847C26.7921 62.1067 30.9251 58.1517 35.1461 54.3107C41.7721 48.2817 41.7901 48.2807 41.6941 38.8807C41.6691 36.5347 41.4761 34.1897 41.4111 32.8697ZM50.8301 38.7907C50.9361 40.9397 51.0471 43.0877 51.1451 45.2377C51.2001 46.4397 51.4761 47.3827 52.5251 48.2227C58.3291 52.8687 64.3581 57.1497 70.9291 60.5017C74.4211 62.2827 74.8041 62.0727 76.4921 58.4277C81.1801 48.3107 80.3981 37.7957 76.2131 28.0947C72.2371 18.8777 64.1551 13.9107 54.6501 11.8447C52.2831 11.3307 50.8821 12.3527 51.0881 14.8677C51.7411 22.8687 49.9711 30.8047 50.8301 38.7907ZM42.4411 61.7537C41.7871 61.7857 41.3271 61.6597 41.0751 61.8427C36.4851 65.1797 32.8451 69.6227 28.7381 73.5227C27.1521 75.0277 28.0361 76.3087 29.6101 77.1327C32.8061 78.8077 36.1521 79.6847 39.7761 79.8517C42.6021 79.9817 43.4201 78.9497 43.2301 76.1997C42.8981 71.4017 41.8551 66.6567 42.4411 61.7537ZM67.5161 70.0137C62.7181 65.9787 57.4671 63.2787 51.9821 59.5677C51.3611 66.4837 52.7311 72.2517 52.9291 78.5477C58.7981 76.8537 63.8231 75.1937 67.5161 70.0137Z" fill="#941F56"/>
        </svg>
        <p style="color: #941F56;">
          Symbols or artifacts decorating your classroom can be used to foster a sense of inclusive and appreciative community in your classroom. Every student’s identity and or culture can be represented in truthful and celebratory ways through symbolic artifacts. 
        </p>
<div class="absoluteStart" style="left: -73px">
<svg width="48" height="48" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M93 46.5C93 72.1812 72.1812 93 46.5 93C20.8188 93 0 72.1812 0 46.5C0 20.8188 20.8188 0 46.5 0C72.1812 0 93 20.8188 93 46.5Z" fill="#32C7BE"/>
<path d="M3.05614 5.81048C4.74401 5.81048 6.11229 4.50976 6.11229 2.90524C6.11229 1.30072 4.74401 0 3.05614 0C1.36828 0 0 1.30072 0 2.90524C0 4.50976 1.36828 5.81048 3.05614 5.81048Z" transform="translate(44.0089 9.68945)" fill="white"/>
<path d="M0.563431 7.4594C1.05902 7.69496 1.71981 7.53792 2.05021 6.98828L3.78478 3.61192L3.04139 8.16608C2.95879 8.71572 3.37178 9.18684 3.94997 9.18684H8.65809C9.23628 9.18684 9.64928 8.71572 9.56668 8.16608L8.82329 3.61192L10.5579 6.98828C10.7231 7.38088 11.1361 7.53792 11.549 7.53792C11.7142 7.53792 11.8794 7.53792 12.0446 7.4594C12.5402 7.22384 12.788 6.59568 12.5402 6.04604L9.56668 0.54964C9.40148 0.23556 8.98849 0 8.57549 0H3.94997C3.53698 0 3.12399 0.23556 2.95879 0.54964L0.150439 6.12456C-0.179956 6.59568 0.0678399 7.22384 0.563431 7.4594Z" transform="translate(40.7191 16.5215)" fill="white"/>
<path d="M2.98165 5.9633C4.62837 5.9633 5.9633 4.62837 5.9633 2.98165C5.9633 1.33493 4.62837 0 2.98165 0C1.33493 0 0 1.33493 0 2.98165C0 4.62837 1.33493 5.9633 2.98165 5.9633Z" transform="translate(17.129 22.6367) scale(1.02498 0.974365) rotate(-45)" fill="white"/>
<path d="M0.0825983 4.46033L2.14756 10.3493C2.31276 10.899 2.97355 11.2131 3.55174 10.9775C4.12993 10.8205 4.46032 10.1923 4.21253 9.64265L2.97355 6.03073L5.7819 9.72117C6.11229 10.1923 6.77308 10.1923 7.18607 9.79969L10.49 6.65889C10.903 6.26629 10.8204 5.63813 10.4074 5.32405L6.44269 2.81141L10.2422 3.98921C10.6552 4.14625 11.0682 3.98921 11.316 3.75365C11.3986 3.67513 11.4812 3.51809 11.5638 3.36105C11.729 2.81141 11.4812 2.26177 10.903 2.02621L4.70812 0.0632135C4.29512 -0.0938265 3.88213 0.0632129 3.63434 0.298773L0.330395 3.43957C6.89256e-07 3.67513 -0.0825988 4.14625 0.0825983 4.46033Z" transform="translate(22.369 23.5234)" fill="white"/>
<path d="M3.05615 5.81048C4.74401 5.81048 6.11229 4.50976 6.11229 2.90524C6.11229 1.30072 4.74401 0 3.05615 0C1.36828 0 0 1.30072 0 2.90524C0 4.50976 1.36828 5.81048 3.05615 5.81048Z" transform="translate(7.74841 44.0039)" fill="white"/>
<path d="M7.84686 11.4778C8.09466 11.0067 7.92946 10.3785 7.35127 10.0645L3.79953 8.41553L8.59025 9.12221C9.16844 9.20073 9.66403 8.80813 9.66403 8.25849V3.78285C9.66403 3.23321 9.16844 2.84061 8.59025 2.91913L3.79953 3.62581L7.35127 1.97689C7.76426 1.81985 7.92946 1.42725 7.92946 1.03465C7.92946 0.877609 7.92946 0.72057 7.84686 0.56353C7.59907 0.0924104 6.93828 -0.143148 6.36009 0.0924116L0.57819 2.91913C0.247795 3.07617 0 3.46877 0 3.86137V8.25849C0 8.65109 0.247795 9.04369 0.57819 9.20073L6.44269 11.9489C6.93828 12.1845 7.59907 11.9489 7.84686 11.4778Z" transform="translate(14.9354 40.9277)" fill="white"/>
<path d="M2.98165 5.9633C4.62837 5.9633 5.9633 4.62837 5.9633 2.98165C5.9633 1.33493 4.62837 0 2.98165 0C1.33493 0 0 1.33493 0 2.98165C0 4.62837 1.33493 5.9633 2.98165 5.9633Z" transform="translate(17.0459 71.2598) scale(1.02498 0.974364) rotate(-45)" fill="white"/>
<path d="M10.2261 7.03604L6.42659 8.21384L10.3087 5.54416C10.8043 5.23008 10.8043 4.60192 10.3913 4.20932L7.08737 1.06852C6.67438 0.675917 6.01359 0.754435 5.6832 1.14704L2.95745 4.916L4.19643 1.30408C4.36162 0.911479 4.19642 0.518877 3.94863 0.283317C3.86603 0.204797 3.70083 0.12628 3.53564 0.0477602C2.95745 -0.10928 2.37926 0.126277 2.13146 0.675917L0.066497 6.56492C-0.0987001 6.95752 0.0664964 7.35012 0.314292 7.58568L3.61823 10.7265C3.94863 11.0406 4.36162 11.1191 4.69202 10.962L10.8869 8.99904C11.4651 8.842 11.7955 8.21384 11.5477 7.6642C11.3825 7.19308 10.8043 6.879 10.2261 7.03604Z" transform="translate(22.3029 59.3457)" fill="white"/>
<path d="M3.05615 5.81049C4.74401 5.81049 6.11229 4.50977 6.11229 2.90525C6.11229 1.30072 4.74401 0 3.05615 0C1.36828 0 0 1.30072 0 2.90525C0 4.50977 1.36828 5.81049 3.05615 5.81049Z" transform="translate(43.8427 78.4727)" fill="white"/>
<path d="M12.074 1.72744C11.5784 1.49188 10.9176 1.64892 10.5872 2.19856L8.85266 5.57492L9.59605 1.02076C9.67865 0.471122 9.26565 0 8.68746 0H3.97934C3.40115 0 2.98816 0.471122 3.07076 1.02076L3.81415 5.57492L2.07958 2.19856C1.91438 1.80596 1.50138 1.64892 1.08839 1.64892C0.923195 1.64892 0.757999 1.64892 0.592802 1.72744C0.0972104 1.963 -0.150584 2.59116 0.0972117 3.1408L2.98816 8.71572C3.15336 9.0298 3.56635 9.26536 3.97934 9.26536H8.60486C9.01786 9.26536 9.43085 9.0298 9.59605 8.71572L12.487 3.1408C12.8174 2.59116 12.5696 1.963 12.074 1.72744Z" transform="translate(40.6069 68.2656)" fill="white"/>
<path d="M2.98165 5.96329C4.62837 5.96329 5.9633 4.62837 5.9633 2.98165C5.9633 1.33493 4.62837 0 2.98165 0C1.33493 0 0 1.33493 0 2.98165C0 4.62837 1.33493 5.96329 2.98165 5.96329Z" transform="translate(68.1917 71.334) scale(1.02498 0.974364) rotate(-45)" fill="white"/>
<path d="M11.614 6.59629L9.54907 0.707287C9.38388 0.157648 8.72309 -0.156429 8.1449 0.0791311C7.56671 0.236171 7.23632 0.864329 7.48411 1.41397L8.72309 5.02589L5.91474 1.33545C5.58435 0.86433 4.92356 0.864331 4.51056 1.25693L1.20662 4.39773C0.793629 4.79033 0.876226 5.41849 1.28922 5.73257L5.17136 8.40225L1.37182 7.22445C0.95883 7.06741 0.545834 7.22445 0.298039 7.46001C0.21544 7.53853 0.132839 7.69557 0.0502403 7.85261C-0.114957 8.40225 0.132841 8.95189 0.711031 9.18745L6.90592 11.1504C7.31892 11.3075 7.73191 11.1504 7.97971 10.9149L11.2836 7.77409C11.6966 7.38149 11.7792 6.91037 11.614 6.59629Z" transform="translate(59.901 59.3906)" fill="white"/>
<path d="M3.05615 5.81048C4.74402 5.81048 6.1123 4.50976 6.1123 2.90524C6.1123 1.30072 4.74402 0 3.05615 0C1.36829 0 0 1.30072 0 2.90524C0 4.50976 1.36829 5.81048 3.05615 5.81048Z" transform="translate(80.1046 44.1602)" fill="white"/>
<path d="M9.16843 2.8542L3.30394 0.106002C2.80835 -0.129558 2.14756 0.0274834 1.81717 0.577123C1.56937 1.04824 1.73457 1.6764 2.31276 1.99048L5.86449 3.6394L1.07378 2.93272C0.495594 2.8542 0 3.2468 0 3.79644V8.27208C0 8.82172 0.495594 9.21432 1.07378 9.1358L5.86449 8.42912L2.31276 10.078C1.89977 10.2351 1.73457 10.6277 1.73457 11.0203C1.73457 11.1773 1.73457 11.3344 1.81717 11.4914C2.06496 11.9625 2.72575 12.1981 3.30394 11.9625L9.16843 9.21432C9.49883 9.05728 9.74663 8.66468 9.74663 8.27208V3.87496C9.74663 3.32532 9.58143 3.01124 9.16843 2.8542Z" transform="translate(69.2845 41.0703)" fill="white"/>
<path d="M2.98164 5.96329C4.62836 5.96329 5.96329 4.62837 5.96329 2.98165C5.96329 1.33493 4.62836 0 2.98164 0C1.33493 0 0 1.33493 0 2.98165C0 4.62837 1.33493 5.96329 2.98164 5.96329Z" transform="translate(68.2733 22.7148) scale(1.02498 0.974365) rotate(-45)" fill="white"/>
<path d="M1.32222 3.926L5.12175 2.7482L1.23962 5.41788C0.74403 5.73196 0.744031 6.36012 1.15702 6.75272L4.46097 9.89352C4.87396 10.2861 5.53474 10.2076 5.86514 9.815L8.67349 6.12456L7.43451 9.73648C7.26931 10.1291 7.43451 10.5217 7.6823 10.7572C7.7649 10.8358 7.9301 10.9143 8.0953 10.9928C8.67349 11.1498 9.25168 10.9143 9.49948 10.3646L11.5644 4.47564C11.7296 4.08304 11.5644 3.69044 11.3166 3.45488L8.0127 0.314081C7.68231 6.5331e-07 7.26932 -0.0785202 6.93892 0.0785198L0.744031 2.04152C0.165842 2.19856 -0.164555 2.82672 0.0832405 3.37636C0.165839 3.76896 0.744029 4.08304 1.32222 3.926Z" transform="translate(60.1165 23.666)" fill="white"/>
<path d="M19.4933 0C8.67285 0 0 8.32312 0 18.5307C0 28.7383 8.75545 37.0614 19.4933 37.0614C30.2311 37.0614 38.9865 28.7383 38.9865 18.5307C38.9039 8.32312 30.2311 0 19.4933 0ZM33.3698 19.5515L33.122 22.2997C33.122 22.3782 33.122 22.4567 33.122 22.4567L34.0306 24.7338C31.5527 29.9946 25.9359 33.6851 19.4933 33.6851C16.4371 33.6851 13.5462 32.8214 11.0682 31.408L12.142 26.5398C12.2246 26.3827 12.142 26.1472 12.0594 25.9901L10.4074 22.5352C10.2422 22.2212 9.99443 22.0641 9.66403 21.9856L6.02969 21.5145C5.28631 21.436 4.95591 20.5722 5.4515 20.0226L5.6993 19.7085C5.9471 19.473 6.27749 19.3159 6.52529 19.3944L8.25986 19.63C8.34246 19.63 8.50765 19.63 8.59025 19.63L10.903 19.1589C10.9856 19.1589 11.0682 19.1589 11.1508 19.0804L12.6376 18.3737C12.8854 18.2166 13.1332 17.9811 13.1332 17.667L13.7114 13.5054C13.794 13.1128 13.5462 12.7202 13.1332 12.5632L12.3898 12.2491C11.9768 12.0921 11.729 11.6995 11.8116 11.2284C11.8942 10.8358 12.2246 10.5217 12.6376 10.5217L13.7114 10.4432C14.207 10.3646 14.6199 9.97204 14.5373 9.50092L14.4547 8.2446V5.73196C14.4547 5.33936 14.207 5.02528 13.794 4.94676L12.8028 4.63268C14.7851 3.76896 17.0153 3.29784 19.3281 3.29784C20.4844 3.29784 21.7234 3.45488 22.7972 3.69044L22.8798 6.20308V6.2816L22.7146 8.95128C22.7146 9.0298 22.7146 9.10832 22.7972 9.18684L23.1276 9.65796C23.2928 9.89352 23.5406 9.89352 23.7884 9.73648L24.697 8.95128C24.9448 8.71572 25.2752 8.87276 25.3578 9.10832V9.26536C25.4404 9.4224 25.6056 9.57944 25.7708 9.57944H26.7619C26.8445 9.57944 26.8445 9.57944 26.9271 9.57944L27.7531 9.26536C28.0835 9.10832 28.4139 9.4224 28.3313 9.73648L27.8357 11.1498C27.8357 11.3854 27.6705 11.4639 27.5053 11.4639H26.3489C26.2663 11.4639 26.2663 11.4639 26.1837 11.4639L24.7796 11.0713C24.697 11.0713 24.6144 11.0713 24.4492 11.0713L23.7884 11.3854C23.7058 11.4639 23.5406 11.4639 23.458 11.3854L22.632 10.9928C22.4668 10.9143 22.3016 10.9143 22.219 10.9928L21.1452 11.6995C20.98 11.778 20.98 11.935 20.98 12.0921L21.1452 13.2699C21.1452 13.4269 21.0626 13.584 20.8974 13.6625L20.0715 14.0551C19.8237 14.2121 19.7411 14.5262 19.9889 14.6832L20.567 15.2329C20.6496 15.3114 20.8148 15.3899 20.98 15.3114L22.0538 15.0758C22.1364 15.0758 22.219 15.0758 22.3016 15.0758L22.7972 15.3114C22.9624 15.3899 23.2928 15.6255 23.6232 15.861C23.7884 16.0181 24.1188 15.9396 24.2014 15.7825C24.284 15.704 24.3666 15.6255 24.5318 15.6255L25.3578 15.547C25.4404 15.547 25.523 15.4684 25.6056 15.4684L25.6882 15.3899C25.9359 15.2329 26.2663 15.3114 26.3489 15.547L26.7619 16.6462C26.7619 16.6462 26.7619 16.7248 26.8445 16.7248L27.3401 17.2744C27.5053 17.4314 27.4227 17.667 27.2575 17.824L26.1011 18.8448C25.9359 19.0018 25.6882 19.0018 25.523 18.8448L24.3666 17.9811L24.284 17.9026L22.7146 17.2744C22.7146 17.2744 22.632 17.2744 22.5494 17.2744L20.4844 17.1174C20.4018 17.1174 20.4018 17.1174 20.3192 17.1174L17.9239 17.7455C17.7587 17.7455 17.6761 17.9026 17.6761 17.9811L16.8501 20.3367C16.8501 20.4152 16.8501 20.5722 16.8501 20.6508L18.0065 23.0849C18.0891 23.2419 18.1717 23.3204 18.3369 23.3204L20.6496 23.556C20.7322 23.556 20.7322 23.556 20.8148 23.6345L21.7234 24.1056C21.806 24.1842 21.8886 24.2627 21.9712 24.4197L22.1364 26.6183C22.1364 26.6968 22.1364 26.6968 22.219 26.7753L23.2928 28.8168C23.2928 28.8954 23.3754 28.8954 23.3754 28.9739L24.697 29.9161C24.8622 30.0732 25.1926 29.9946 25.2752 29.8376L25.7708 29.2094C25.7708 29.2094 25.7707 29.1309 25.8533 29.1309L26.7619 26.9324V26.8538L27.0923 23.713C27.0923 23.6345 27.0923 23.6345 27.0923 23.556L27.7531 22.2997C27.8357 22.1426 28.0009 22.0641 28.1661 22.0641L30.3963 22.3782C30.5615 22.3782 30.6441 22.3782 30.7267 22.2212L31.1397 21.8286C31.3049 21.6715 31.3049 21.436 31.1397 21.2789L30.0659 19.9441C29.9007 19.7085 29.9833 19.3944 30.3137 19.3159L30.7267 19.2374C30.8093 19.2374 31.4701 19.1589 31.6353 19.1589H31.7178L32.7916 19.3159C33.2046 19.1589 33.3698 19.3944 33.3698 19.5515Z" transform="translate(27.5719 28.4551)" fill="white"/>
</svg>
</div>
    </div>
  `
];

const list2 = [
  `<div class="bubbleBase programBubble relativePosition">Right! Check a strategies that I call Artifact Library<div class="absoluteStart"></div></div>
  `,
  `<div class="fullWidth paddingMedium rounded relativePosition" style="color: white; background-color: #F27E7E90">
    <div class="flexRow" >
      <div style="flex: 1">
        <p style="color: #941F56; font-weight: bold">A Multicultural Loan Program</p>
        <p>In her book “Culturally Responsive Teaching: Theory and Practice,” Geneva Gay writes about a teacher that is an exemplar embodiment of multicultural teaching. This teacher makes it a point to fill their classroom with empowering and authentic symbolism that represents all of the cultures that her students bring with them to the classroom.</p>

        <p>Her secret to filling her classroom as fantastically as she does is to run a loan program. At the beginning of the year she has all of her students bring in an artifact (a book, poster, statue, blanket, etc) that positively represents something about their home or ethnic culture. Throughout the year she engages her students in readings of the loaned books and uses the other artifacts as decoration.  </p>
      </div>
      <div style="flex: 1">
        <p style="color: #941F56; font-weight: bold">Making your own Artifact Library</p>
        <p>How can you begin to fill your own class in the way Geneva’s teacher does? Can you create a loan program of your own? Here a few ideas to get you started:</p>
        <ul>
          <li>Make the first assignment of each semester to bring in a cultural artifact from home.</li>

          <li>Make it extra credit to read a book or learn about an artifact that a peer has brought in and tell the rest of the class about it. This can build relationships between students as they learn from each other for extra credit.</li>
        </ul>
        <div class="flexRow">
          <svg width="92" height="141" viewBox="0 0 92 141" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L4.72454 52.2518" transform="translate(36.4341 25.375)" stroke="#941F56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M0 0L4.96077 49.4017" transform="translate(17.5359 25.375)" stroke="#941F56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.72454 0L0 52.2518" transform="translate(50.6077 25.375)" stroke="#941F56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.96077 0L0 49.4017" transform="translate(69.2697 25.375)" stroke="#941F56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <svg width="145" height="149" viewBox="0 0 145 149" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.8176 0H0V3.12878H31.8176V0Z" transform="matrix(0.876551 -0.481308 0.481893 0.87623 100.254 64.9102)" fill="#941F56"/>
            <path d="M31.8176 0H0V3.12878H31.8176V0Z" transform="matrix(0.876551 -0.481308 0.481893 0.87623 100.255 75.502)" fill="#941F56"/>
            <path d="M31.8176 0H0V3.12878H31.8176V0Z" transform="matrix(0.876551 -0.481308 0.481893 0.87623 100.248 86.0957)" fill="#941F56"/>
            <path d="M144.935 11.1677L123.145 23.1331V3.86334L120.531 6.42847C120.297 6.64745 106.443 19.9893 94.6719 31.3134V0.0312821L74.3225 47.1265H74.0564V3.64436H70.9257V47.0952H70.8004L50.451 0V31.3916C38.5857 20.13 24.7324 6.64745 24.5133 6.42847L21.9148 3.86334V23.2582L0 11.1677V113.46L60.0622 146.463V146.338C63.9703 148.093 68.2064 149 72.491 149C76.7757 149 81.0117 148.093 84.9198 146.338V146.463L144.121 113.976L144.935 113.538V11.1677ZM120.015 24.8223L87.9879 42.4498L86.9704 43.0129C96.4877 33.9254 113.44 17.5962 120.015 11.2616V24.8223ZM91.5099 15.1093V34.3165C85.5773 40.0098 80.5525 44.749 78.8463 46.3757L77.8914 46.5947L91.5099 15.1093ZM53.4878 15.1093L67.1219 46.626L66.0105 46.3757C64.2573 44.8116 59.3578 40.1193 53.4878 34.4103V15.1093ZM25.0455 11.2459C31.6043 17.5962 48.5256 33.9254 57.9177 43.0129L56.8689 42.4342L25.0455 24.9162V11.2459ZM3.13069 16.4544L56.9315 46.016V141.176L3.13069 111.615V16.4544ZM60.0152 142.881V47.627C63.926 49.3723 68.161 50.2743 72.4441 50.2743C76.7271 50.2743 80.9621 49.3723 84.8729 47.627V142.881C81.0256 144.848 76.7657 145.874 72.4441 145.874C68.1224 145.874 63.8625 144.848 60.0152 142.881V142.881ZM141.804 111.599L87.9879 141.176V46.016L141.804 16.4544V111.599Z" transform="translate(0.0649414)" fill="#941F56"/>
            <path d="M2.33236 1.31385L0 0.0156444V67.1158L0.798328 67.5693C3.78679 69.2264 7.14829 70.0959 10.5661 70.0959C13.9838 70.0959 17.3453 69.2264 20.3338 67.5693L21.1321 67.1158V0L18.7998 1.29821C16.282 2.69748 13.4491 3.43315 10.5681 3.43589C7.68708 3.43863 4.8528 2.70834 2.33236 1.31385V1.31385ZM17.9858 65.2545C15.6688 66.3792 13.1264 66.9637 10.5504 66.9637C7.97442 66.9637 5.43206 66.3792 3.11503 65.2545V5.14591C7.89117 7.03767 13.2096 7.03767 17.9858 5.14591V65.2545Z" transform="translate(61.9116 60.6719)" fill="#941F56"/>
            <path d="M43.2348 0L0 23.7588V96.8807L43.2348 73.1219V0ZM40.1041 71.2763L3.13068 91.6096V25.6044L40.1197 5.27104L40.1041 71.2763Z" transform="translate(93.3437 30.375)" fill="#941F56"/>
            </svg>
        </div>
      </div>
    </div>
    <p style="font-size: 11pt; color: #2C3E99">Culturally responsive teaching and the brain, Zaretta Hammond, 2015, p.   79</p>
    <div class="absoluteStart">
    <svg width="48" height="48" viewBox="0 0 91 92" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="45.5" cy="46" rx="45.5" ry="46" fill="#32C7BE"/>
<path d="M15.8549 43.1613L37.3927 21.6939L39.5611 23.8552C39.8997 24.1925 40.343 24.3612 40.7865 24.3612C41.2298 24.3612 41.6734 24.1925 42.0114 23.8552L44.5056 21.3694L35.2679 12.1617L32.7736 14.6477C32.4486 14.9716 32.266 15.4109 32.266 15.8689C32.266 16.3269 32.4485 16.7663 32.7736 17.09L34.942 19.2513L29.7709 24.4056L19.2785 13.9472C19.8062 12.7185 20.0851 11.3851 20.0851 10.0083C20.0851 7.33485 19.0406 4.82155 17.1439 2.93115C15.2476 1.04099 12.7262 0 10.0441 0C9.14317 0 8.25796 0.120553 7.39955 0.353945L10.5272 3.47151L12.6793 5.61614C13.0312 5.96674 13.2147 6.45137 13.1833 6.94614L12.9109 11.2509C12.8559 12.1192 12.1618 12.8112 11.2906 12.866L6.97202 13.1372C6.47483 13.1684 5.98942 12.9854 5.63779 12.6348L3.4835 10.4877L2.07765 9.08615L0.356433 7.37078C-0.588503 10.8113 0.369486 14.5194 2.94391 17.0854C4.84037 18.9758 7.36189 20.017 10.044 20.017C11.4278 20.017 12.7679 19.7378 14.0024 19.2098L24.4932 29.6664L13.4043 40.7191L9.60917 40.2607C9.08045 40.1967 8.55207 40.3786 8.17548 40.754L1.41284 47.4946C0.736139 48.1688 0.736139 49.2624 1.41284 49.9371L6.60675 55.114C6.9317 55.4379 7.37252 55.62 7.83193 55.62C8.29158 55.62 8.73216 55.4382 9.05711 55.114L15.8196 48.3734C16.1962 47.9982 16.3786 47.4713 16.3146 46.9444L15.8549 43.1613Z" transform="translate(17.1449 17.0859)" fill="white"/>
<path d="M13.0425 0H0V8.06893H13.0425V0Z" transform="translate(64.1008 36.0137) scale(1.00162 0.998357) rotate(-135)" fill="white"/>
<path d="M9.76102 6.51067C9.76091 4.77158 9.08143 3.13645 7.8477 1.90709C6.61386 0.677262 4.9735 0 3.22884 0C2.07793 0 0.973353 0.296489 0 0.850089L8.90816 9.72922C9.46357 8.75904 9.76102 7.65794 9.76102 6.51067Z" transform="translate(63.1935 17.9805)" fill="white"/>
<path d="M24.388 10.1548C22.4914 8.26439 19.9699 7.22317 17.2879 7.22317C15.9053 7.22317 14.5663 7.50193 13.3328 8.0287L5.27789 0L0 5.2607L8.05482 13.2894C7.5261 14.5191 7.24666 15.8536 7.24666 17.2316C7.24666 19.905 8.29105 22.4183 10.1877 24.3087C12.0841 26.1988 14.6055 27.2398 17.2876 27.2399H17.288C18.1887 27.2399 19.0736 27.1193 19.9321 26.8859L16.8045 23.7684L14.653 21.6238C14.301 21.2732 14.1174 20.7887 14.149 20.2938L14.4212 15.989C14.4763 15.1207 15.1704 14.4286 16.0415 14.374L20.3601 14.1029C20.8573 14.0717 21.3428 14.2546 21.6944 14.6052L23.8486 16.7524L25.2545 18.1538L26.9755 19.8691C27.9203 16.4292 26.9623 12.7208 24.388 10.1548Z" transform="translate(46.5238 46.3613)" fill="white"/>
</svg>
    </div>
    </div>
  `,
  `<div class="bubbleBase programBubble generalJSXBubble relativePosition">Before you go, I have some suggestions for you to reflect on how to become an expert on using <span style="font-family: 'Margarine';font-size: 13pt; font-color: #941F56">symbols</span> in your classroom<div class="absoluteStart"></div></div>
  `,
  `<div style="background-color: #F27E7E90; padding: 16px;" class="relativePosition">
      <h3 style="color: #941F56">INVITATION TO INQUIRY</h3>
      <p style="color: white">What are important symbols of your own? What images come to mind when you think of cultural symbols belonging to cultures other than your own? Are they empowering images? Ask your students what are powerful images or symbols that relate to their identities.  
      </p>
      <div class="absoluteStart">
      <svg width="48" height="48" viewBox="0 0 93 94" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="46.5" cy="47" rx="46.5" ry="47" fill="#32C7BE"/>
<path d="M0 11.0097L11.0562 0L13.4783 2.42271L2.42929 13.4286L0 11.0097Z" transform="translate(12 66.6855)" fill="white"/>
<path d="M57.3518 28.5583C57.3518 44.3374 44.5163 57.136 28.6808 57.136C12.8453 57.136 0 44.3365 0 28.5583C0 12.7879 12.8453 0 28.6808 0C44.5163 0 57.3518 12.7879 57.3518 28.5583ZM54.1339 28.5583C54.1339 14.5532 42.7476 3.20549 28.6808 3.20549C14.616 3.20549 3.22964 14.5532 3.22964 28.5583C3.22964 42.574 14.616 53.9198 28.6808 53.9198C42.7466 53.9208 54.1339 42.574 54.1339 28.5583Z" transform="translate(17.9952 17)" fill="white"/>
<path d="M12.6997 6.33017C12.6997 2.83548 9.85212 0 6.34398 0C2.82801 0 0 2.83548 0 6.33017C0 9.83362 2.82899 12.671 6.34398 12.671C9.85212 12.671 12.6997 9.83362 12.6997 6.33017Z" transform="translate(40.3441 35.0391)" fill="white"/>
<path d="M26.6903 14.0771C27.5757 8.2484 24.5219 2.52097 19.161 0C15.8072 2.66508 11.0346 2.66508 7.67305 0C2.3307 2.52097 -0.73478 8.2484 0.15154 14.0771C8.02581 19.9214 18.8082 19.9214 26.6903 14.0771Z" transform="translate(33.1017 47.0625)" fill="white"/>
</svg>
      </div>
    </div>
  `,
  `<div style="background-color: #EEE; padding: 16px; border: 1px solid #2C3E99; color: #2C3E99" class="generalJSXBubble relativePosition">
      <h3 style="font-weight: bold">REFERENCES</h3>
      <div class="flexRow">
      <svg style="display: inline-block" width="36" height="36" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 0H13.5V7L11.5 5L9.5 7V0H2.5C1.125 0 0 1.125 0 2.5V16.5C0 17.875 1.125 19 2.5 19H15.5C15.775 19 16 18.775 16 18.5C16 13.9682 16 10.9502 16 0.5C16 0.225 15.775 0 15.5 0ZM15 16H2.5C1.83925 16 1.838 17 2.5 17H15V18H2.5C0.51775 18 0.51425 15 2.5 15H15V16Z" transform="translate(0.00012207 2.76172) rotate(-9.93465)" fill="#2C3E99"/>
      </svg>
    <p>
      Culturally responsive teaching and the brain, Zaretta Hammond, 2015 
    </p>
    </div>
    <div class="absoluteStart" style="left: -72px">
    <svg width="48" height="48" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="47" cy="47" r="47" fill="#32C7BE"/>
<path d="M1.11352 42.0699C1.11352 40.2293 2.44745 38.586 4.31494 38.2574C7.11618 37.7315 9.85073 36.5483 12.5186 34.6421C16.1869 32.0785 18.0544 28.9233 18.0544 25.1766C18.0544 21.7585 14.7863 21.89 12.1851 22.1529C2.98102 23.1389 -3.15504 13.4105 1.71379 5.65404C6.38253 -1.83946 18.1211 -1.5108 23.4568 4.93098C31.1268 14.1993 28.459 31.0268 19.9219 38.9147C15.8534 42.6614 11.118 44.9621 5.64887 45.9481C3.3145 46.3425 1.11352 44.4362 1.11352 42.0699ZM33.1277 42.0699C33.1277 40.2293 34.4616 38.586 36.3291 38.2574C39.1304 37.7315 41.8649 36.5483 44.5328 34.6421C48.2011 32.0785 50.0686 28.9233 50.0686 25.1766C50.0686 21.7585 46.8005 21.89 44.1993 22.1529C34.9952 23.1389 28.8592 13.4105 33.728 5.58831C38.3967 -1.9052 50.1353 -1.57653 55.471 4.86525C63.141 14.1335 60.4732 30.9611 51.9361 38.849C47.8676 42.5957 43.1322 44.8963 37.6631 45.8823C35.3287 46.3425 33.1277 44.4362 33.1277 42.0699Z" transform="translate(77 24) scale(-1 1)" fill="white"/>
</svg>
    </div>
    </div>
  `
];

const elements1 = list1.map((li) => {
      return {
            type: 'jsx',
            value: li,
          };
    });

const message1 = {
  key: 'symbolism_1',
  speaker: 'program',
  actions: [{name: 'Interesting... but what does this mean for my strategy as a teacher?', messageKey: 'symbolism_2'}],
  body: elements1,
};

const elements2 = list2.map((li) => {
  return {
        type: 'jsx',
        value: li,
      };
});

const message2 = {
  key: 'symbolism_2',
  speaker: 'program',
  actions: [],
  body: elements2,
};

const bubbleS = "<div class='bubbleBase programBubble'>";
const bubbleE = "</div>";
const centerDiv = '<div style="display: flex; align-content: center; justify-content: center; margin-bottom: 8px;">';

// Hao:
/* For a message of type input or message_input, the <textarea> must have an id that is the message's key concatenated with '_textarea'*/
const convoStarter = [
  {key: 'greeting_goals_challenges', speaker: 'program', actions: [{name: 'What do you mean? What kinds of goals and how do you support them?', messageKey: 'goals_and_challenges_definition'}], body: [{type: 'text', value: "This is Diverso and I'm Diverso the bird. I'm a teacher and instructional coach. I help out around here by supporting teachers with their teaching related goals and challenges when they need advice."}]},

  {key: 'goals_and_challenges_definition', speaker: 'program', actions: [{name: "Neat. Where do your principles and strategies come from?", messageKey: 'theory_intro_1' }], body: [{type: 'text', value: "Goals or challenges related to things like relationship building with students, promoting student engagment, and making curriculum content more accessible."}, {type: 'text', value: "I support teachers by connecting those goals and challenges to research-backed teaching principles and strategies. The goals and challenges can be related to a variety of things, such as relationship building or making the content more accessible and relevant to students."}]},

  {key: 'theory_intro_1', speaker: 'program', actions: [{name: 'Culturally Relevant Teaching... What’s that?', messageKey: 'crt_explained_1'}], body: [{type: 'text', value: "They come from my favorite body of theory and research called Culturally Relevant Teaching (CRT)."}]},

  {key: 'crt_explained_1', speaker: 'program', actions: [{name: 'Sounds important! So what does a culturally responsive teacher do?', messageKey: 'video_1'}], body: [{type: 'text', value: "CRT helps teachers like you design the most impactful and relevant learning experiences for your students by building on their cultural norms and prior knowledge."}, {type: 'text', value: "It especially helps you shape inclusive and powerful learning experiences for your culturally and linguistically diverse students. "}]},

  {key: 'video_1', speaker: 'program', actions: [{name: 'submit', messageKey: 'nice_take_away', type: 'message_input'}], body: [{type: 'text', value: "Good question! I suggest watching these two videos made by leading experts on culturally relevant teaching and pedagogy to start getting an idea."}, {type: 'jsx', value: centerDiv + '<iframe width="560" height="315" src="https://www.youtube.com/embed/3NycM9lYdRI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="margin-right: 8px;"></iframe><iframe width="560" height="315" src="https://www.youtube.com/embed/y7e-GC6oGhg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' + bubbleE}, {type: 'text', value: "So what do you think? Betweeen the two videos, what do you think Culturally Relevant or Responsive teachers are good at? You can share your thoughts in the box below!"}, {type: 'jsx', value: "<textarea id='video_1_textarea' style='border: 4px solid #E0E0E0; border-radius: 12px; background-color: #F3F3F3; width: 100%; min-height: 100px;'></textarea>"}]},

  {key: 'nice_take_away', speaker: 'program', actions: [{name: 'Awesome! I feel like I’m learning already!', messageKey: 'diverso_explained_1'}], body: [{type: 'text', value: "Nice takeaways! Here are my own thoughts regarding what cutlturally relevant teachers are good at doing:"}, {type: 'jsx', value: strength_board}, {type: 'text', value: "This is just a high level list. There’s more to say about each of these skills and I encourage you to refine this list and add to it as you keep learning!"}]},

  {key: 'diverso_explained_1', speaker: 'program', actions: [{name: 'Thanks for looking out for me!', messageKey: ''}], body: [{type: 'text', value: "I’m glad! As a skilled teacher, you already know a lot. But there’s always room to learn new perspectives and be reminded of things you’ve learned in the past."}, {type: 'text', value: "And that’s the idea behind Diverso."}, {type: 'text', value: "You’re an expert and we want to make sure you keep becoming more expert. Everytime you come here to get help with a challenge or goal you’ll learn a little bit more about how you can be a culturally relevant teacher. Some of it will be new, and some of it might be a reminder."}]},

    {
      key: 'goals_list', speaker: 'program', actions: [{name: 'Relationship Building', messageKey: ''}, {name: 'Breaching difficult conversation', messageKey: ''}, {name: 'Teaching Content', messageKey: ''}, {name: 'Increasing student Engagement', messageKey: ''}, {name: 'Building Student Self-Efficacy', messageKey: ''}, {name: 'Building a culture of respect between students', messageKey: 'challenge_decribe'}, {name: 'Hum.... I was looking for something else', messageKey: ''}], body: [{type: 'text', value: 'GREAT! I’d love to help. Which of the following categories does your goal or challenge fit into?'}]
    },

    {
      key: 'challenge_decribe', speaker: 'program', actions: [{name: '“My students aren’t very close. They seem to sit in clusters by race and ethnicity and I get the sense that some groups harbor biases against others. I wish I could help them feel a greater connection and appreciation for one another.”', messageKey: 'symbolism_1'}, {name: '“Some of my students make fun of one another (call each other names, call each other dumb when they get things wrong, etc) and I’m having trouble getting them to be more respectful.”', messageKey: ''}, {name: '“The other day one of my students called another one by a racial slur and I’m trying to plan my conversation with the student and the rest of the class about why that’s not ok.”', messageKey: ''}], body: [{type: 'text', value: 'AWESOME! Related to Building a culture of respect between your students, which of the following best describes your challenge?'}]
    },

    {
      key: 'big_idea_follow_up', speaker: 'program', actions: [{name: 'Sociopolitical context', messageKey: ''}, {name: 'Culture and learning', messageKey: ''}, {name: 'Identity', messageKey: ''}], body: [{type: 'text', value: 'GREAT! I’d love to help. Which of the following categories does the topic you want to talk about most closely relate to?'}]
    },

    message1,
    message2,
];

const messagePromises = convoStarter.map((message) => Message.create(message));
Promise.all(messagePromises).then(() => {
  console.log('data populated');
  mongoose.disconnect();
}).catch((err) => {
  console.log('data population failed!', err.toString());
  mongoose.disconnect();
})