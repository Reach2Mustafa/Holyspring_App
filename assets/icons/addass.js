import React from 'react'
import Svg, { Rect, Path } from 'react-native-svg';

const Addass = ({ color }) => {
  return (
    <Svg width="74" height="44" viewBox="0 0 74 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect width="74" height="44" rx="22" fill={color} />
      <Path d="M19.7984 27.676C18.6784 27.676 17.8437 27.3747 17.2944 26.772C16.7504 26.164 16.4784 25.3053 16.4784 24.196V22.98C16.4784 21.8653 16.753 21.0093 17.3024 20.412C17.8517 19.8093 18.6837 19.508 19.7984 19.508C20.129 19.508 20.4304 19.54 20.7024 19.604C20.9744 19.6627 21.217 19.7427 21.4304 19.844C21.649 19.94 21.833 20.0413 21.9824 20.148L22.0944 21.276C21.8437 21.084 21.545 20.9213 21.1984 20.788C20.857 20.6547 20.4544 20.588 19.9904 20.588C19.2437 20.588 18.6864 20.796 18.3184 21.212C17.9557 21.6227 17.7744 22.2227 17.7744 23.012V24.164C17.7744 24.9373 17.9557 25.532 18.3184 25.948C18.6864 26.364 19.2437 26.572 19.9904 26.572C20.4704 26.572 20.8837 26.5053 21.2304 26.372C21.5824 26.2387 21.8944 26.076 22.1664 25.884L22.0464 27.028C21.8117 27.188 21.505 27.3373 21.1264 27.476C20.7477 27.6093 20.305 27.676 19.7984 27.676ZM24.9599 22.724L24.6639 21.724L24.9839 21.708C25.1545 21.0467 25.4479 20.5267 25.8639 20.148C26.2799 19.764 26.8319 19.572 27.5199 19.572C27.6905 19.572 27.8425 19.5853 27.9759 19.612C28.1145 19.6387 28.2372 19.6707 28.3439 19.708L28.4239 20.964C28.2905 20.9213 28.1412 20.8867 27.9759 20.86C27.8159 20.8333 27.6372 20.82 27.4399 20.82C26.8532 20.82 26.3412 20.9827 25.9039 21.308C25.4719 21.6333 25.1572 22.1053 24.9599 22.724ZM23.7279 27.5V19.692H24.9919L24.9279 21.996L25.0239 22.092V27.5H23.7279ZM32.7579 27.676C31.5685 27.676 30.6725 27.3853 30.0699 26.804C29.4672 26.2227 29.1659 25.3907 29.1659 24.308V22.916C29.1659 21.8173 29.4459 20.972 30.0059 20.38C30.5659 19.7827 31.3845 19.484 32.4619 19.484C33.1872 19.484 33.7925 19.62 34.2779 19.892C34.7632 20.1587 35.1285 20.54 35.3739 21.036C35.6192 21.532 35.7419 22.124 35.7419 22.812V23.1C35.7419 23.2707 35.7339 23.4413 35.7179 23.612C35.7072 23.7827 35.6912 23.9507 35.6699 24.116H34.4779C34.4885 23.86 34.4939 23.6173 34.4939 23.388C34.4992 23.1587 34.5019 22.948 34.5019 22.756C34.5019 22.2813 34.4245 21.8813 34.2699 21.556C34.1205 21.2253 33.8939 20.9747 33.5899 20.804C33.2912 20.628 32.9152 20.54 32.4619 20.54C31.7899 20.54 31.2859 20.7347 30.9499 21.124C30.6139 21.5133 30.4459 22.0707 30.4459 22.796V23.54L30.4539 23.7V24.444C30.4539 24.7693 30.5019 25.0627 30.5979 25.324C30.6939 25.5853 30.8432 25.812 31.0459 26.004C31.2539 26.1907 31.5152 26.3347 31.8299 26.436C32.1499 26.532 32.5285 26.58 32.9659 26.58C33.4725 26.58 33.9445 26.5133 34.3819 26.38C34.8192 26.2467 35.2299 26.0653 35.6139 25.836L35.4939 26.956C35.1472 27.1747 34.7445 27.3507 34.2859 27.484C33.8272 27.612 33.3179 27.676 32.7579 27.676ZM29.8459 24.116V23.14H35.3979V24.116H29.8459ZM42.0318 27.5L42.0878 25.604L42.0398 25.404V22.916L42.0478 22.46C42.0478 21.8253 41.8851 21.356 41.5598 21.052C41.2398 20.748 40.7304 20.596 40.0318 20.596C39.4718 20.596 38.9571 20.676 38.4878 20.836C38.0238 20.996 37.6104 21.1827 37.2478 21.396L37.3678 20.292C37.5704 20.1693 37.8104 20.0493 38.0878 19.932C38.3704 19.8093 38.6904 19.708 39.0478 19.628C39.4104 19.548 39.8078 19.508 40.2398 19.508C40.7998 19.508 41.2744 19.5773 41.6638 19.716C42.0584 19.8493 42.3758 20.044 42.6158 20.3C42.8611 20.556 43.0398 20.8653 43.1518 21.228C43.2638 21.5907 43.3198 21.996 43.3198 22.444V27.5H42.0318ZM39.3438 27.668C38.5704 27.668 37.9758 27.4813 37.5598 27.108C37.1491 26.7293 36.9438 26.1907 36.9438 25.492V25.26C36.9438 24.54 37.1651 24.004 37.6078 23.652C38.0558 23.2947 38.7651 23.0467 39.7358 22.908L42.2078 22.556L42.2798 23.5L39.8958 23.844C39.2984 23.9293 38.8718 24.076 38.6158 24.284C38.3598 24.4867 38.2318 24.788 38.2318 25.188V25.316C38.2318 25.7267 38.3571 26.0413 38.6078 26.26C38.8638 26.4787 39.2451 26.588 39.7518 26.588C40.1998 26.588 40.5838 26.5107 40.9038 26.356C41.2238 26.2013 41.4824 25.9933 41.6798 25.732C41.8771 25.4707 42.0104 25.18 42.0798 24.86L42.2798 25.74H42.0318C41.9571 26.0813 41.8158 26.3987 41.6078 26.692C41.4051 26.9853 41.1198 27.2227 40.7517 27.404C40.3838 27.58 39.9144 27.668 39.3438 27.668ZM48.0679 27.66C47.4652 27.66 46.9799 27.5693 46.6119 27.388C46.2439 27.2067 45.9772 26.932 45.8119 26.564C45.6465 26.196 45.5639 25.7373 45.5639 25.188V20.26H46.8439V25.036C46.8439 25.548 46.9612 25.9267 47.1959 26.172C47.4305 26.412 47.8252 26.532 48.3799 26.532C48.6945 26.532 48.9959 26.4973 49.2839 26.428C49.5772 26.3587 49.8519 26.26 50.1079 26.132L49.9879 27.244C49.7372 27.372 49.4439 27.4733 49.1079 27.548C48.7719 27.6227 48.4252 27.66 48.0679 27.66ZM44.2839 20.844V19.804H50.0279L49.9079 20.844H44.2839ZM45.5719 19.932L45.5639 17.74L46.8679 17.572L46.8119 19.932H45.5719ZM54.6173 27.676C53.4279 27.676 52.5319 27.3853 51.9293 26.804C51.3266 26.2227 51.0253 25.3907 51.0253 24.308V22.916C51.0253 21.8173 51.3053 20.972 51.8653 20.38C52.4253 19.7827 53.2439 19.484 54.3212 19.484C55.0466 19.484 55.6519 19.62 56.1373 19.892C56.6226 20.1587 56.9879 20.54 57.2333 21.036C57.4786 21.532 57.6013 22.124 57.6013 22.812V23.1C57.6013 23.2707 57.5933 23.4413 57.5773 23.612C57.5666 23.7827 57.5506 23.9507 57.5293 24.116H56.3373C56.3479 23.86 56.3533 23.6173 56.3533 23.388C56.3586 23.1587 56.3613 22.948 56.3613 22.756C56.3613 22.2813 56.2839 21.8813 56.1293 21.556C55.9799 21.2253 55.7533 20.9747 55.4493 20.804C55.1506 20.628 54.7746 20.54 54.3212 20.54C53.6493 20.54 53.1453 20.7347 52.8093 21.124C52.4733 21.5133 52.3053 22.0707 52.3053 22.796V23.54L52.3133 23.7V24.444C52.3133 24.7693 52.3613 25.0627 52.4573 25.324C52.5533 25.5853 52.7026 25.812 52.9053 26.004C53.1133 26.1907 53.3746 26.3347 53.6893 26.436C54.0093 26.532 54.3879 26.58 54.8253 26.58C55.3319 26.58 55.8039 26.5133 56.2413 26.38C56.6786 26.2467 57.0893 26.0653 57.4733 25.836L57.3533 26.956C57.0066 27.1747 56.6039 27.3507 56.1453 27.484C55.6866 27.612 55.1773 27.676 54.6173 27.676ZM51.7053 24.116V23.14H57.2573V24.116H51.7053Z" fill="white" />
    </Svg>



  )
}

export default Addass
