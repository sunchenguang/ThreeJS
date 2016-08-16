/**
 * Created by suncg on 2016/8/16.
 */
// 初始化统计器
import StatsMin from '../lib/stats.min';

class Stats {
    constructor() {
        this.stats = new StatsMin();
        this.init();
    }

    init() {
        this.setPosition();
    }


    setPosition(position = 'absolute', right = '0', left = '0') {
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.right = '0';
        this.stats.domElement.style.top = '0';
    }


}


export default Stats;
