class workout{
    constructor (exerciseName, sets, reps, duration, date){
        this.id = Date.now();
        this.exerciseName = exerciseName;
        this.sets = sets;
        this.reps = reps;
        this.duration = duration;
        this.date = date;
    }
}

let workouts = [];

const workoutForm = document.getElementById("workoutForm");
const workoutList = document.getElementById("workoutList");
const totalWorkoutsEl = document.getElementById("totalWorkouts");
const totalDurationEl = document.getElementById("totalDuration");

workoutForm.addEventListener("submit", addWorkout)

function addWorkout(e){
    e.preventDefault();
    const exerciseName = document.getElementById("exerciseName").value.trim();
    const sets = parseInt(document.getElementById("sets").value);
    const reps = parseInt(document.getElementById("reps").value);
    const duration = parseInt(document.getElementById("duration").value);
    const date = document.getElementById("workoutDate").value;

    if(exerciseName && sets && reps && duration  && date){
        const newWorkput = new workout(exerciseName, sets, reps, duration, date);
        workouts.push(newWorkput)
        saveWorkout();
        renderWorkout();
        workoutForm.reset();
    }
}

function renderWorkout(){
    workoutList.innerHTML = "";
    workouts.forEach(workout =>{
    const li = document.createElement("li");
    li.classList.add("workout-item")
    li.innerHTML = `
    <strong>${workout.exerciseName}</strong>-${workout.sets}sets x ${workout.reps} reps - ${workout.duration} min on ${workout.date}
    <button class ="delete" onclick ="deleteWorkout(${workout.id})">Delete</button>`
    workoutList.appendChild(li);

    });
    updateSummary();
}

function deleteWorkout(id){
    workouts = workouts.filter(workout =>{
        workout.id !==id
        saveWorkouts();
    renderWorkout();

    });
}

function updateSummary() {
    totalWorkoutsEl.textContent = workouts.length;
    totalDurationEl.textContent = workouts.reduce((total, workout) => total + workout.duration, 0);
}

function saveWorkout() {
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

function loadWorkouts() {
    const stored = localStorage.getItem("workouts");
    if (stored) {
        workouts = JSON.parse(stored);
        renderWorkout();
    }
}

loadWorkouts();
