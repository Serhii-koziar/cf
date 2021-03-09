import 'swiper/swiper-bundle.css';

import {initCodeExample} from './components/initCodeExample';
import {scrollDown} from './components/scrollDown';
import {initSlider} from './components/slider';
import ModalWindow from './ModalWindow/ModalWindow';
import ModalContentWindow from './ModalWindow/ModalContentWindow';
import ModalVideoWindow from './ModalWindow/ModalVideoWindow';

export function runAfterDomLoad() {
    initCodeExample()
    scrollDown()
    initSlider()
    const modal = new ModalWindow(ModalContentWindow, ModalVideoWindow)
}
