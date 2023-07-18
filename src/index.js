import './style.css';
import './assets/update.png';
import './assets/downIcon.png';
import './assets/dots.png';
import './assets/delete.png';

// Storing checked activities
const changeActivity = (array, index) => {
  array[index].completed = !array[index].completed;
  localStorage.setItem('taskStorage', JSON.stringify(array));
};

// Function to remove all completed item
const clearAllItems = (array) => {
  array = array.filter((object) => object.completed !== true);
  array.forEach((element, index) => {
    element.index = (index + 1);
  });
  localStorage.setItem('taskStorage', JSON.stringify(array));
  document.location.reload();
};
class ToDoClass {
  constructor() {
    this.listArray = JSON.parse(localStorage.getItem('taskStorage')) || [];
  }

        displayList = () => {
          const list = document.querySelector('#list');
          list.innerHTML = '';
          this.listArray.forEach((Item, index) => {
            const activity = document.createElement('li');
            activity.className = 'activity';

            const activityDetail = document.createElement('div');
            activityDetail.className = 'activityDetail';

            const checker = document.createElement('input');
            checker.type = 'checkbox';
            checker.className = 'checker';
            checker.checked = Item.completed;
            checker.addEventListener('change', () => {
              changeActivity(this.listArray, index);
            });
            activityDetail.appendChild(checker);

            const ItemDescription = document.createElement('input');
            ItemDescription.type = 'text';
            ItemDescription.className = 'itemDescription';
            ItemDescription.value = `${Item.description}`;
            ItemDescription.addEventListener('keypress', (event) => {
              if (event.key === 'Enter' && ItemDescription.value) {
                this.updateActivity(ItemDescription.value, (index));
              }
            });
            activityDetail.appendChild(ItemDescription);
            activity.appendChild(activityDetail);

            const removeBtn = document.createElement('img');
            removeBtn.src = './images/delete.png';
            removeBtn.alt = 'Delete';
            removeBtn.className = 'icons removeBtn';
            removeBtn.addEventListener('click', () => {
              this.removeActivity(index + 1);
            });
            activity.appendChild(removeBtn);
            list.appendChild(activity);
          });
        }

        addActivity = (value) => {
          const arrayItem = {};
          arrayItem.description = value;
          arrayItem.completed = false;
          arrayItem.index = (this.listArray.length + 1);
          this.listArray.push(arrayItem);
          localStorage.setItem('taskStorage', JSON.stringify(this.listArray));
          this.displayList();
        }

      updateActivity = (value, index) => {
        this.listArray[index].description = value;
        localStorage.setItem('taskStorage', JSON.stringify(this.listArray));
        this.displayList();
      }

      removeActivity = (value) => {
        this.listArray = this.listArray.filter((Item) => Item.index !== value);
        this.listArray.forEach((Item, index) => {
          Item.index = (index + 1);
        });
        localStorage.setItem('taskStorage', JSON.stringify(this.listArray));
        this.displayList();
      }
}

// Index.js file
const listOfActivities = new ToDoClass();
const updateListBtn = document.querySelector('.updateListBtn');
const addButton = document.querySelector('.addButton');
const inputText = document.querySelector('.inputText');
const clearBtn = document.querySelector('#clearBtn');

updateListBtn.onclick = () => {
  document.location.reload();
};

addButton.onclick = () => {
  listOfActivities.addActivity(inputText.value);
  inputText.value = '';
};

inputText.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && inputText.value) {
    listOfActivities.addActivity(inputText.value);
    inputText.value = '';
  }
});

clearBtn.onclick = () => {
  clearAllItems(listOfActivities.listArray);
};

window.onload = () => {
  listOfActivities.displayList();
};
