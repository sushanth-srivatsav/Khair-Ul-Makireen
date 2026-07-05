class GoalSystem{

static goals=[];

static load(){

    GoalSystem.goals=
    JSON.parse(
        localStorage.getItem("goals")
    ) || [];

}

static save(){

    localStorage.setItem(
        "goals",
        JSON.stringify(
            GoalSystem.goals
        )
    );

}

static addGoal(){

    const name=
    document
    .getElementById("goalName")
    .value
    .trim();

    const unit=
    document
    .getElementById("goalUnit")
    .value
    .trim();

    const target=
    Number(
    document
    .getElementById("goalTarget")
    .value);

    const deadline=
    document
    .getElementById("goalDeadline")
    .value;

    if(
        !name||
        !unit||
        !target||
        !deadline
    ){

        alert(
        "Fill all fields."
        );

        return;

    }

    GoalSystem.goals.push({

        id:Date.now(),

        name,

        unit,

        target,

        progress:0,

        deadline,

        created:new Date(),

        completed:null,

        history:[]

    });

    GoalSystem.save();

    GoalSystem.render();

    document
    .getElementById("goalName")
    .value="";

    document
    .getElementById("goalUnit")
    .value="";

    document
    .getElementById("goalTarget")
    .value="";

    document
    .getElementById("goalDeadline")
    .value="";

}

static render(){

    let html="";

    GoalSystem.goals.forEach(goal=>{

        if(goal.completed)
            return;

        let percent=
        (
            goal.progress/
            goal.target
            *100
        ).toFixed(1);

        html+=`

<div class="card">

<h3>${goal.name}</h3>

<p>

${goal.progress}

/

${goal.target}

${goal.unit}

(${percent}%)

</p>

<div class="progress-bar">

<div
class="progress-fill"
style="width:${percent}%">

</div>

</div>

</div>

`;

    });

    document
    .getElementById(
    "activeGoals"
    )
    .innerHTML=html;

}

}

GoalSystem.load();

GoalSystem.render();
