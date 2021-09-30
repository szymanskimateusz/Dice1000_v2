export default class BoxClass {
    constructor(id, title) {
        this.elements = {};
        this.elements.root = BoxClass.createRoot();
        this.elements.title = this.elements.root.querySelector(".box-title");
        this.elements.diceShadow = this.elements.root.querySelector(".diceShadow");

        //this.elements.root.dataset.id = id;
		//this.elements.title.textContent = title;
    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="box">
                <div class="box-title"></div>
                <div class="diceShadow">
                </div>
                <div class="diceShadow">
                </div>
                <div class="diceShadow">
                </div>
                <div class="diceShadow">
                </div>
                <div class="diceShadow">
                </div>
            </div>
        `).children[0];
    }
}