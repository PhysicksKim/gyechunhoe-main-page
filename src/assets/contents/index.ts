// jjak
import jjakPoster from '@assets/image/contents/jjak/jjak_00_poster.webp';
import jjak01 from '@assets/image/contents/jjak/jjak_01.webp';
import jjak02 from '@assets/image/contents/jjak/jjak_02.webp';
import jjak03 from '@assets/image/contents/jjak/jjak_03.webp';
import jjak04 from '@assets/image/contents/jjak/jjak_04.webp';
import jjak05 from '@assets/image/contents/jjak/jjak_05.webp';
import jjak06 from '@assets/image/contents/jjak/jjak_06.webp';
import jjak07 from '@assets/image/contents/jjak/jjak_07.webp';
import jjak08 from '@assets/image/contents/jjak/jjak_08.webp';
import jjak09 from '@assets/image/contents/jjak/jjak_09.webp';

// vcastle
import vcastlePoster from '@assets/image/contents/vcastle/vcastle_00_poster.webp';
import vcastle01 from '@assets/image/contents/vcastle/vcastle_01.webp';
import vcastle02 from '@assets/image/contents/vcastle/vcastle_02.webp';
import vcastle03 from '@assets/image/contents/vcastle/vcastle_03.webp';
import vcastle04 from '@assets/image/contents/vcastle/vcastle_04.webp';
import vcastle05 from '@assets/image/contents/vcastle/vcastle_05.webp';
import vcastle06 from '@assets/image/contents/vcastle/vcastle_06.webp';
import vcastle07 from '@assets/image/contents/vcastle/vcastle_07.webp';
import vcastle08 from '@assets/image/contents/vcastle/vcastle_08.webp';
import vcastle09 from '@assets/image/contents/vcastle/vcastle_09.webp';
import vcastle10 from '@assets/image/contents/vcastle/vcastle_10.webp';
import vcastle11 from '@assets/image/contents/vcastle/vcastle_11.webp';

// vsummit
import vsummitPoster from '@assets/image/contents/vsummit/vsummit_00_poster.webp';
import vsummit01 from '@assets/image/contents/vsummit/vsummit_01.webp';
import vsummit02 from '@assets/image/contents/vsummit/vsummit_02.webp';
import vsummit03 from '@assets/image/contents/vsummit/vsummit_03.webp';
import vsummit04 from '@assets/image/contents/vsummit/vsummit_04.webp';
import vsummit05 from '@assets/image/contents/vsummit/vsummit_05.webp';
import vsummit06 from '@assets/image/contents/vsummit/vsummit_06.webp';
import vsummit07 from '@assets/image/contents/vsummit/vsummit_07.webp';
import vsummit08 from '@assets/image/contents/vsummit/vsummit_08.webp';

// witchtalk
import witchtalkPoster from '@assets/image/contents/witchtalk/witchtalk_00_poster.webp';
import witchtalk01 from '@assets/image/contents/witchtalk/witchtalk_01.webp';
import witchtalk02 from '@assets/image/contents/witchtalk/witchtalk_02.webp';
import witchtalk03 from '@assets/image/contents/witchtalk/witchtalk_03.webp';
import witchtalk04 from '@assets/image/contents/witchtalk/witchtalk_04.webp';
import witchtalk05 from '@assets/image/contents/witchtalk/witchtalk_05.webp';
import witchtalk06 from '@assets/image/contents/witchtalk/witchtalk_06.webp';
import witchtalk07 from '@assets/image/contents/witchtalk/witchtalk_07.webp';

// churak
import churakPoster from '@assets/image/contents/churak/churak_00_poster.webp';
import churak01 from '@assets/image/contents/churak/churak_01.webp';
import churak02 from '@assets/image/contents/churak/churak_02.webp';
import churak03 from '@assets/image/contents/churak/churak_03.webp';
import churak04 from '@assets/image/contents/churak/churak_04.webp';
import churak05 from '@assets/image/contents/churak/churak_05.webp';
import churak06 from '@assets/image/contents/churak/churak_06.webp';
import churak07 from '@assets/image/contents/churak/churak_07.webp';
import churak08 from '@assets/image/contents/churak/churak_08.webp';
import churak09 from '@assets/image/contents/churak/churak_09.webp';
import churak10 from '@assets/image/contents/churak/churak_10.webp';

import { Content } from '@src/types/content';

export const CONTENTS: Content[] = [
  {
    type: 'jjak',
    name: '버츄얼 애정촌 짝지',
    poster: jjakPoster,
    images: [
      jjak01,
      jjak02,
      jjak03,
      jjak04,
      jjak05,
      jjak06,
      jjak07,
      jjak08,
      jjak09,
    ],
  },
  {
    type: 'vcastle',
    name: '버츄얼 캐슬',
    poster: vcastlePoster,
    images: [
      vcastle01,
      vcastle02,
      vcastle03,
      vcastle04,
      vcastle05,
      vcastle06,
      vcastle07,
      vcastle08,
      vcastle09,
      vcastle10,
      vcastle11,
    ],
  },
  {
    type: 'vsummit',
    name: '버정상회담',
    poster: vsummitPoster,
    images: [
      vsummit01,
      vsummit02,
      vsummit03,
      vsummit04,
      vsummit05,
      vsummit06,
      vsummit07,
      vsummit08,
    ],
  },
  {
    type: 'witchtalk',
    name: '마녀가리',
    poster: witchtalkPoster,
    images: [
      witchtalk01,
      witchtalk02,
      witchtalk03,
      witchtalk04,
      witchtalk05,
      witchtalk06,
      witchtalk07,
    ],
  },
  {
    type: 'churak',
    name: '추락 퀴즈쇼',
    poster: churakPoster,
    images: [
      // 01 ~ 10
      churak01,
      churak02,
      churak03,
      churak04,
      churak05,
      churak06,
      churak07,
      churak08,
      churak09,
      churak10,
    ],
  },
];
