import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const teamJsonPath = path.join(__dirname, '../../public/json/team.json');
const processedImgDir = path.join(__dirname, '../../public/img/members');

// Improved format name function - uses only first and last name, removes accents
const formatName = (originalName) => {
    // Remove file extension
    let name = originalName.replace(/\.[^/.]+$/, "");
    
    // Remove numbering like (1) or (2)
    name = name.replace(/\s*\(\d+\)\s*$/, "");
    
    // Split the name into parts
    const nameParts = name.split(' ');
    
    // Take only first and last name (first and last elements)
    let simpleName;
    if (nameParts.length >= 2) {
        // Use first name and last name only
        simpleName = nameParts[0] + '_' + nameParts[1];
    } else {
        // If only one name part, use it as is
        simpleName = nameParts[0];
    }
    
    // Remove accents and diacritics
    simpleName = simpleName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Convert to lowercase
    return simpleName.toLowerCase();
};

// Get list of processed image files
const getExistingProcessedImages = () => {
    try {
        if (!fs.existsSync(processedImgDir)) {
            console.log('Processed images directory does not exist.');
            return [];
        }
        
        return fs.readdirSync(processedImgDir)
            .filter(file => file.toLowerCase().endsWith('.png'))
            .map(file => file.toLowerCase());
    } catch (error) {
        console.error('Error accessing processed images directory:', error.message);
        return [];
    }
};

// Main function to update the team.json file
const updateTeamJson = async () => {
    try {
        // Read the team.json file
        const teamJsonContent = await fs.promises.readFile(teamJsonPath, 'utf8');
        const teamData = JSON.parse(teamJsonContent);
        
        // Get existing processed images
        const processedImages = getExistingProcessedImages();
        console.log(`Found ${processedImages.length} processed images`);
        
        // Create a map for quick lookup
        const imageMap = new Map();
        
        // Add processed images to map
        processedImages.forEach(img => {
            // Extract name without extension
            const nameWithoutExt = path.basename(img, path.extname(img));
            imageMap.set(nameWithoutExt, img);
        });
        
        // Update each team member
        let updatedCount = 0;
        
        teamData.forEach(member => {
            // Format name to potential filename
            const formattedName = formatName(member.name);
            
            // Check if we have an image for this member
            if (imageMap.has(formattedName)) {
                // Add pfp1 field with relative URL to the image
                member.pfp1 = `/img/members/processed/${formattedName}.png`;
                updatedCount++;
                console.log(`✓ Added image link for ${member.name} (${formattedName}.png)`);
            } else {
                console.log(`✗ No matching image found for ${member.name} (looking for ${formattedName}.png)`);
            }
        });
        
        // Write updated JSON back to file
        await fs.promises.writeFile(
            teamJsonPath, 
            JSON.stringify(teamData, null, 2),
            'utf8'
        );
        
        console.log(`Updated ${updatedCount} out of ${teamData.length} team members`);
        console.log(`Team JSON updated and saved to ${teamJsonPath}`);
        
    } catch (error) {
        console.error('Error updating team.json:', error.message);
    }
};

// Execute the main function
(async () => {
    try {
        console.log('Starting team.json update process...');
        await updateTeamJson();
        console.log('Process complete!');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
})();