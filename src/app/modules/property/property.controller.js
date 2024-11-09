import { Property } from '../../../models/Property.js';

// Function to add multiple properties to the database
const addMultipleProperties = async (req, res) => {
  try {
    const properties = req.body; // Get properties array from request body
	addedProperties = []
    skippedProperties = []
    
	for(var prop in properties){
		const { id, title, image, location, price, description } = prop;
		let db_property = await Property.findById(id);
		addProperty = new Property({id, title, image, location, price, description});

		if(db_property){
			skippedProperties.push(addProperty);
		}else{
			await addProperty.save();
			addedProperties.push(addProperty);
		}
	}
    res.status(201).json({
      message: `${addedProperties.length} properties added successfully`,
      addedProperties,
      skippedProperties,
    });
  } catch (error) {
    console.error('Error adding properties:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProperties = async (req, res) => {
	try{
		console.log("properties")
		let getProperties = await Property.find({});
		
		console.log("properties", getProperties.length)
		res.status(200).json(getProperties); 
	}
	catch(err){
		res.status(500).json({message: 'Server Error'});
	}
}

// Function to recommend properties (unchanged)
const recommnend = async (req, res) => {
  const viewedProperties = req.body;

  if (!viewedProperties || viewedProperties.length === 0) {
    return res.json([]); // No recommendations if no properties are viewed
  }

  const viewedLocations = new Set(
    viewedProperties.map((property) => property.location)
  );
  const viewedCategories = new Set(
    viewedProperties.map((property) => property.category)
  );

  let properties = await Property.find({});
console.log("this is recommendation", properties.length)
  const recommendations = properties.filter(
    (property) =>
      (viewedLocations.has(property.location) ||
        viewedCategories.has(property.category)) &&
      !viewedProperties.some((viewed) => viewed.id === property.id)
  );

  console.log(recommendations);
  res.json(recommendations);
};

export const PropertyController = {
  addMultipleProperties, // New function to add multiple properties
  recommnend,
  getProperties
};
