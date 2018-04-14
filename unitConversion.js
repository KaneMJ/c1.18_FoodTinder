function convertUnit(meals){
    const ingredientArr=[];
    const quantityArr=[];
    const unitArr=[];
    
    for(var i=0; i<meals.length; i++){
        for(var x = 0; x<meals[i]['mealIngr'].length; x++){
            // console.log(meals)
            ingredientArr.push(meals[i]['mealIngr'][x]['ingredient']);
            quantityArr.push(meals[i]['mealIngr'][x]['amount']);
            unitArr.push(meals[i]['mealIngr'][x]['unit_type']);
        } 
    }
// console.log(ingredientArr);
// console.log(quantityArr);
// console.log(unitArr);


    for(var i = 0; i<quantityArr.length; i++){
        var currentQuantity=quantityArr[i];
        var currentUnit=unitArr[i];
        switch(currentUnit){
            case 't':
            case 'tsp':
            case 'teaspoon':
            case 'Teaspoon':
            case 'teaspoons':
            case 'Teaspoons':
                unitArr[i]='teaspoons'
                break;
            case 'T':
            case 'Tbsp':
            case 'Tbs':
            case 'tbs':
            case 'tbsp':
            case 'Tablespoon':
            case 'tablespoon':
            case 'Tablespoons':
            case 'tablespoons':
                quantityArr[i]=convertToTsp(currentQuantity,'tablespoon');
                unitArr[i]='teaspoons';
                break;
            case 'c':
            case 'C':
            case 'Cup':
            case 'cup':
            case 'cups':
            case 'Cups':
                quantityArr[i]=convertToTsp(currentQuantity,'cup');
                unitArr[i]='teaspoons';
                break;
            case 'pt':
            case 'pint':
            case 'Pint':
            case 'pints':
            case 'Pints':
                quantityArr[i]=convertToTsp(currentQuantity,'pint');
                unitArr[i]='teaspoons';
                break;
            case 'qt':
            case 'quart':
            case 'Quart':
            case 'quarts':
            case 'Quarts':
                quantityArr[i]=convertToTsp(currentQuantity,'quart');
                unitArr[i]='teaspoons';
                break;
            case 'gal':
            case 'Gal':
            case 'gallon':
            case 'Gallon':
            case 'gallons':
            case 'Gallons':
                quantityArr[i]=convertToTsp(currentQuantity,'gallon');
                unitArr[i]='teaspoons';
                break;
            case 'ozs':
            case 'Ozs':
            case 'OZS':
            case 'oz':
            case 'Oz':
            case 'OZ':
            case 'ounce':
            case 'Ounce':
            case 'ounces':
            case 'Ounces':
                unitArr[i]='oz';
                break;
            case 'lbs':
            case 'Lbs':
            case 'LBS':
            case 'LB':
            case 'lb':
            case 'Lb':
            case 'pound':
            case 'Pound':
            case 'POUND':
            case 'pounds':
            case 'Pounds':
            case 'POUNDS':
                quantityArr[i]=convertToLbs(currentQuantity);
                unitArr[i]='oz';
                break;
            default:
                break;
        }
    }
    /*return*/ addLikeUnits(ingredientArr, quantityArr, unitArr);
    function addLikeUnits(ingredients, quantities, unitOfMeasurement){
        var sumOfTsp = {};
        var sumOfOz = {};
        var miscSums = {};
        // var lastIngredientSummed = ingredients[0];
        for(var q = 0; q<quantities.length; q++){
            if(unitOfMeasurement[q]==='teaspoons'){
                if(sumOfTsp[ingredients[q]]){
                    sumOfTsp[ingredients[q]]['total']+=quantities[q];
                } else {
                    sumOfTsp[ingredients[q]]={};
                    sumOfTsp[ingredients[q]]['name']=ingredients[q];
                    sumOfTsp[ingredients[q]]['total']=quantities[q];
                }
            }else if(unitOfMeasurement[q]==='oz'){
                if(sumOfOz[ingredients[q]]){
                    sumOfOz[ingredients[q]]['total']+=quantities[q];
                } else {
                    sumOfOz[ingredients[q]]={};
                    sumOfOz[ingredients[q]]['name']=ingredients[q];
                    sumOfOz[ingredients[q]]['total']=quantities[q];
                }
            } else {
                if(miscSums[ingredients[q]]){
                    miscSums[ingredients[q]]['total']+=quantities[q];
                } else {
                    miscSums[ingredients[q]]={};
                    miscSums[ingredients[q]]['name']=ingredients[q];
                    miscSums[ingredients[q]]['total']=quantities[q];
                    miscSums[ingredients[q]]['unit']=unitOfMeasurement[q];
                }
            }
            
        }
        console.log('Teaspoons: ',sumOfTsp);
        console.log('Ounces: ',sumOfOz);
        console.log('Misc: ',miscSums);

        const ingredientsObj={};
        const ingredientsOzBase={};
        const ingredientsTspBase={};
        const ingredientsMiscBase={};


        for(var x in sumOfTsp){
            var numOfTsp = sumOfTsp[x]['total'];
            if(numOfTsp>=768){
                numOfTsp = numOfTsp / 768;
                numOfTsp = Math.ceil(numOfTsp);
                ingredientsTspBase[x]= numOfTsp + ' gallon(s)'
            }else if(numOfTsp>=192){
                numOfTsp = numOfTsp / 192;
                numOfTsp = Math.ceil(numOfTsp);
                ingredientsTspBase[x]= numOfTsp + ' quart(s)'
            } else if(numOfTsp>=96){
                numOfTsp = numOfTsp / 96;
                numOfTsp = Math.ceil(numOfTsp);
                ingredientsTspBase[x]= numOfTsp + ' pint(s)'
            } else if(numOfTsp>=48){
                numOfTsp = numOfTsp / 48;
                numOfTsp = Math.ceil(numOfTsp);
                ingredientsTspBase[x]= numOfTsp + ' cup(s)'
            } else if(numOfTsp>=3){
                numOfTsp = numOfTsp / 3;
                numOfTsp = Math.ceil(numOfTsp);
                ingredientsTspBase[x]= numOfTsp + ' tablespoons(s)'
            }else{
                ingredientsTspBase[x]= numOfTsp + ' teaspoon(s)'
            }
        }
        for(var x in sumOfOz){
            var numOfOz = sumOfOz[x]['total'];
            if(numOfOz>=16){
                numOfOz = numOfOz / 16;
                numOfOz = Math.ceil(numOfOz);
                ingredientsOzBase[x]= numOfOz + ' pound(s)'
            }else{
                ingredientsOzBase[x]= numOfOz + ' ounces'
            }
        }
        for(var x in miscSums){
            var total = miscSums[x]['total'];
            var unit = miscSums[x]['unit'];
            ingredientsMiscBase[x]= total + ' ' + unit;
        }
        ingredientsObj['ounces']=ingredientsOzBase;
        ingredientsObj['teaspoons']=ingredientsTspBase;
        ingredientsObj['misc']=ingredientsMiscBase;

        console.log('Ingredients: ',ingredientsObj);

        // return ingredientsObj;
    }
}
function convertToTsp(num, unit){
    switch (unit){
        case 'tablespoon':
            return num * 3;
        case 'cup':
            return num * 48;
        case 'pint':
            return num * 96;
        case 'quart':
            return num * 192;
        case 'gallon':
            return num * 768;
    }
}

function convertToLbs(num){
    return num * 16; 
}





let myMeals = [
    {
        // imgSrc: beans,
        mealName: 'Beans',
        mealIngr: [
                        {"ingredient":"cheese","amount":"2","unit_type":"cups","recipe_id":"123"},
                        {"ingredient":"sauce","amount":"2","unit_type":"tbs","recipe_id":"123"}
                    ],
        mealInstr: [
                        {"step_num":"1","step":"roll dough","recipe_id":"123"},
                        {"step_num":"2","step":"cover with cheese","recipe_id":"123"},
                        {"step_num":"3","step":"make pizza","recipe_id":"123"}
                    ]
    },
    {
        // imgSrc: burger,
        mealName: 'Hamburger',
        mealIngr: [
                        {"ingredient":"lettuce","amount":"2","unit_type":"cups","recipe_id":"123"},
                        {"ingredient":"sauce","amount":"2","unit_type":"tbs","recipe_id":"123"}
                    ],
        mealInstr: [
                        {"step_num":"1","step":"roll dough","recipe_id":"123"},
                        {"step_num":"2","step":"cover with cheese","recipe_id":"123"},
                        {"step_num":"3","step":"make pizza","recipe_id":"123"}
                    ]
    },
    {
        // imgSrc: curry,
        mealName: 'Curry',
        mealIngr: [
                        {"ingredient":"lettuce","amount":"2","unit_type":"cups","recipe_id":"123"},
                        {"ingredient":"sauce","amount":"2","unit_type":"tbs","recipe_id":"123"}
                    ],
        mealInstr: [
                        {"step_num":"1","step":"roll dough","recipe_id":"123"},
                        {"step_num":"2","step":"cover with cheese","recipe_id":"123"},
                        {"step_num":"3","step":"make pizza","recipe_id":"123"}
                    ]
    },
    {
        // imgSrc: donuts,
        mealName: 'Donuts',
        mealIngr: [
                        {"ingredient":"cheese","amount":"2","unit_type":"cups","recipe_id":"123"},
                        {"ingredient":"sauce","amount":"2","unit_type":"tbs","recipe_id":"123"}
                    ],
        mealInstr: [
                        {"step_num":"1","step":"roll dough","recipe_id":"123"},
                        {"step_num":"2","step":"cover with cheese","recipe_id":"123"},
                        {"step_num":"3","step":"make pizza","recipe_id":"123"}
                    ]
    },
    {
        // imgSrc: fruit,
        mealName: 'Assortment of Fruit',
        mealIngr: [
                        {"ingredient":"cheese","amount":"2","unit_type":"cups","recipe_id":"123"},
                        {"ingredient":"sauce","amount":"2","unit_type":"tbs","recipe_id":"123"}
                    ],
        mealInstr: [
                        {"step_num":"1","step":"roll dough","recipe_id":"123"},
                        {"step_num":"2","step":"cover with cheese","recipe_id":"123"},
                        {"step_num":"3","step":"make pizza","recipe_id":"123"}
                    ]
    },
    {
        // imgSrc: mcdonalds,
        mealName: '5 Dollar McDonalds Platter',
        mealIngr: [
                        {"ingredient":"cheese","amount":"2","unit_type":"cups","recipe_id":"123"},
                        {"ingredient":"sauce","amount":"2","unit_type":"tbs","recipe_id":"123"}
                    ],
        mealInstr: [
                        {"step_num":"1","step":"roll dough","recipe_id":"123"},
                        {"step_num":"2","step":"cover with cheese","recipe_id":"123"},
                        {"step_num":"3","step":"make pizza","recipe_id":"123"}
                    ]
    },
    {
        // imgSrc: pancake,
        mealName: 'Full Stack',
        mealIngr: [
                        {"ingredient":"lettuce","amount":"2","unit_type":"cups","recipe_id":"123"},
                        {"ingredient":"sauce","amount":"2","unit_type":"tbs","recipe_id":"123"}
                    ],
        mealInstr: [
                        {"step_num":"1","step":"roll dough","recipe_id":"123"},
                        {"step_num":"2","step":"cover with cheese","recipe_id":"123"},
                        {"step_num":"3","step":"make pizza","recipe_id":"123"}
                    ]
    },
    {
        // imgSrc: pasta,
        mealName: 'Pasta',
        mealIngr: [
                        {"ingredient":"cheese","amount":"2","unit_type":"cups","recipe_id":"123"},
                        {"ingredient":"sauce","amount":"2","unit_type":"tbs","recipe_id":"123"}
                    ],
        mealInstr: [
                        {"step_num":"1","step":"roll dough","recipe_id":"123"},
                        {"step_num":"2","step":"cover with cheese","recipe_id":"123"},
                        {"step_num":"3","step":"make pizza","recipe_id":"123"}
                    ]
    },
    {
        // imgSrc: tacos,
        mealName: 'Tacos',
        mealIngr: [
                        {"ingredient":"fruit","amount":"3","unit_type":"feet","recipe_id":"123"},
                        {"ingredient":"licorice","amount":"6","unit_type":"twirls","recipe_id":"123"}
                    ],
        mealInstr: [
                        {"step_num":"1","step":"roll dough","recipe_id":"123"},
                        {"step_num":"2","step":"cover with cheese","recipe_id":"123"},
                        {"step_num":"3","step":"make pizza","recipe_id":"123"}
                    ]
    },
    {
        // imgSrc: tart,
        mealName: 'Fruit Tarts',
        mealIngr: [
                        {"ingredient":"carrots","amount":"1","unit_type":"lbs","recipe_id":"123"},
                        {"ingredient":"ghost peppers","amount":"1","unit_type":"pounds","recipe_id":"123"}
                    ],
        mealInstr: [
                        {"step_num":"1","step":"roll dough","recipe_id":"123"},
                        {"step_num":"2","step":"cover with cheese","recipe_id":"123"},
                        {"step_num":"3","step":"make pizza","recipe_id":"123"}
                    ]
    },
    {
        // imgSrc: tart,
        mealName: 'Fruit Tarts',
        mealIngr: [
                        {"ingredient":"carrots","amount":"1","unit_type":"cup","recipe_id":"123"},
                        {"ingredient":"ghost peppers","amount":"1","unit_type":"pounds","recipe_id":"123"}
                    ],
        mealInstr: [
                        {"step_num":"1","step":"roll dough","recipe_id":"123"},
                        {"step_num":"2","step":"cover with cheese","recipe_id":"123"},
                        {"step_num":"3","step":"make pizza","recipe_id":"123"}
                    ]
    },
];

convertUnit(myMeals);