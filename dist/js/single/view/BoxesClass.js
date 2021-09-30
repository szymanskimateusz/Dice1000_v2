import BoxClass from "./BoxClass.js";

export default class BoxesClass {
    constructor(root) {
        this.root = root;

        BoxesClass.boxes().forEach(box => {
            const boxView = new BoxClass(box.id, box.title);

            this.root.appendChild(boxView.elements.root);
        });
    }

    static boxes() {
        return [
            {
                id: 1,
                title: "Roll"
            },
            {
                id: 2,
                title: "Box"
            }
        ];
    }
}