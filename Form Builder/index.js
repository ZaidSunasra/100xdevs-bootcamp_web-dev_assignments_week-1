const fieldTypeSelect = document.getElementById("input-type");
const fieldConfigPanel = document.getElementById("input-question")
const addFieldButton = document.getElementById("add-field");
const formPreview = document.getElementById("form-preview");
let currentFieldConfig;

const fieldComponents = {
    "text-input": {
        configTemplate: `
            <span class="font-bold">Select Field Label:</span>
            <input type="text" placeholder="Enter field label" class="px-4 py-2 border border-2 border-gray-200 rounded-xl"/>
        `,
        renderField: (label) => `
            <label class="font-bold">${label}</label>
            <input type="text" placeholder="Enter ${label}" class="px-4 py-2 border border-2 border-gray-200 rounded-xl"/>
        `
    },
    "number-input": {
        configTemplate: `
            <span class="font-bold">Select Field Label:</span>
            <input type="text" placeholder="Enter field label" class="px-4 py-2 border border-2 border-gray-200 rounded-xl"/>
        `,
        renderField: (label) => `
            <label class="font-bold">${label}</label>
            <input type="number" placeholder="Enter ${label}" class="px-4 py-2 border border-2 border-gray-200 rounded-xl"/>
        `
    },
    "email-input": {
        configTemplate: `
            <span class="font-bold">Select Field Label:</span>
            <input type="text" placeholder="Enter field label" class="px-4 py-2 border border-2 border-gray-200 rounded-xl"/>
        `,
        renderField: (label) => `
            <label class="font-bold">${label}</label>
            <input type="email" placeholder="Enter ${label}" class="px-4 py-2 border border-2 border-gray-200 rounded-xl"/>
        `
    },
     "password-input": {
        configTemplate: `
            <span class="font-bold">Select Field Label:</span>
            <input type="text" placeholder="Enter field label" class="px-4 py-2 border border-2 border-gray-200 rounded-xl"/>
        `,
        renderField: (label) => `
            <label class="font-bold">${label}</label>
            <input type="password" placeholder="Enter ${label}" class="px-4 py-2 border border-2 border-gray-200 rounded-xl"/>
        `
    },
    "select": {
        configTemplate: `
            <span class="font-bold">Select Field Label:</span>
            <input type="text" placeholder="Enter field label" class="px-4 py-2 border border-2 border-gray-200 rounded-xl"/>
            <span class="font-bold">Options (comma separated):</span>
            <input type="text" placeholder="option1,option2,option3" class="px-4 py-2 border border-2 border-gray-200 rounded-xl options-input"/>
        `,
        renderField: (label, options) => {
            const optionsHTML = options.split(",").map(opt => `<option value="${opt.trim()}" class="capitalize">${opt.trim()}</option>`).join("");
            return `
                <label class="font-bold capitalize">${label}</label>
                <select class="px-4 py-2 border border-2 border-gray-200 rounded-xl">
                    <option value="" class="capitalize">Select ${label}</option>
                    ${optionsHTML}
                </select>
            `;
        }
    },
    "radio": {
        configTemplate: `
            <span class="font-bold">Select Field Label:</span>
            <input type="text" placeholder="Enter field label" class="px-4 py-2 border border-2 border-gray-200 rounded-xl"/>
            <span class="font-bold">Options (comma separated):</span>
            <input type="text" placeholder="option1,option2,option3" class="px-4 py-2 border border-2 border-gray-200 rounded-xl options-input"/>
        `,
        renderField: (label, options) => {
            const optionsHTML = options.split(",").map((opt) => `
                <label class="flex items-center gap-2 capitalize">
                    <input type="radio" name="${label}" value="${opt.trim()}"/>
                    ${opt.trim()}
                </label>
            `).join("");
            return `
                <label class="font-bold">${label}</label>
                <div class="flex flex-col gap-2">${optionsHTML}</div>
            `;
        }
    }
};

fieldTypeSelect.addEventListener("change", function () {
    if (!fieldTypeSelect.value) {
        fieldConfigPanel.innerHTML = "";
        return;
    }

    currentFieldConfig = document.createElement("div");
    currentFieldConfig.innerHTML = fieldComponents[fieldTypeSelect.value].configTemplate;
    currentFieldConfig.className = "flex flex-col gap-2";
    fieldConfigPanel.innerHTML = "";
    fieldConfigPanel.appendChild(currentFieldConfig);
})

addFieldButton.addEventListener("click", function () {
    if (!currentFieldConfig) {
        alert("Please select a field type");
        return;
    }

    const inputs = currentFieldConfig.querySelectorAll("input");
    const label = inputs[0]?.value.trim();
    const options = inputs[1]?.value.trim();

    if (!label) {
        alert("Field label cannot be empty");
        return;
    }

    if(options == "") {
        alert("Options cannot be empty");
        return;
    }

    const formField = document.createElement("div");
    formField.className = "flex flex-col gap-2 px-4 py-2";
    formField.innerHTML = fieldComponents[fieldTypeSelect.value].renderField(label, options);

    formPreview.appendChild(formField);

    fieldTypeSelect.value = "";
    fieldConfigPanel.innerHTML = "";
    currentFieldConfig = null;
})