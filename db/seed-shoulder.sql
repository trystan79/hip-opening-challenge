-- =============================================
-- 4-Day Shoulder Rehabilitation Routine - Seed Data
-- =============================================

-- ROUTINE
INSERT INTO routine (id, name, slug, description, total_days, icon, color) VALUES
(3, 'Shoulder Rehab', 'shoulder-rehab', 'A 4-day shoulder rehabilitation routine mixing mobility, stretching, band strengthening, and capsular work. 5 exercises per day covering rotator cuff, scapular stabilisers, and shoulder mobility.', 4, 'shoulder', '#4a90d9');

-- =============================================
-- DAYS (4 days)
-- Day 1: Mobility & Rotation
-- Day 2: Active Movement & Bands
-- Day 3: Strengthening & Stretch
-- Day 4: Advanced & Integration
-- =============================================

INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(32, 3, 1, 'Mobility & Rotation', 'Gentle warm-up with pendulum swings, passive external rotation using a dowel, internal rotation band strengthening, pec stretching in a door frame, and posterior capsule mobility via the sleeper stretch.', 1);
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(33, 3, 1, 'Active Movement & Bands', 'Active flexion and extension to restore basic arm movement patterns, banded external rotation for rotator cuff strengthening, spinal mobilisation with cat-camel, and scapular retraction via band pull-aparts.', 2);
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(34, 3, 1, 'Strengthening & Stretch', 'Internal rotation ROM work with a dowel, gravity-eliminated abduction, anterior deltoid band strengthening, scapular stability with face pulls, and eccentric rotator cuff loading.', 3);
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(35, 3, 1, 'Advanced & Integration', 'Behind-back IR stretch with a stick, active external rotation transition, middle deltoid band abduction, advanced capsular internal rotation at 90 degrees, and shoulder decompression via door frame hang.', 4);

-- =============================================
-- POSES (20 total, 5 per day)
-- Each with full muscle indexing and coaching data
-- =============================================

-- DAY 1: Mobility & Rotation

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(32, 1, 'Pendulum Exercise', 'Lean forward at the waist, supporting yourself with one hand on a table or chair. Let the affected arm hang straight down, completely relaxed. Gently swing the arm in small circles, gradually increasing the size. Perform circles in both directions, then switch to forward-back and side-to-side swings.',
'["Let gravity do the work — the arm should be completely relaxed and hanging like a pendulum","Initiate the movement from your body, not by muscling the arm","Start with very small circles and only increase if pain-free","Keep the shoulder blade relaxed and dropped — avoid hiking the shoulder"]',
120, 1, '["table or chair"]',
'Rotator cuff (gentle), Glenohumeral joint',
'Supraspinatus, Infraspinatus, Subscapularis, Teres minor (all gently)',
'Deltoid (passive), Biceps long head (passive), Joint capsule, Subacromial bursa',
'Shoulder circumduction, Shoulder flexion, Shoulder abduction',
'multi-planar',
'Smaller circles. Keep arm closer to body. Lean less forward.',
'Leaning forward, arm hanging, gentle circles in both directions. Forward-back and side-to-side swings.',
'Hold a light water bottle (500ml) for gentle traction. Increase circle diameter.',
'{"inhale":4,"hold":0,"exhale":4}',
1);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(32, 2, 'External Rotation with Dowel Sitting', 'Sit upright in a chair. Hold a dowel rod or broomstick with both hands, palms up, elbows bent to 90 degrees and tucked into your sides. Place a small rolled towel between your elbow and body on the affected side to set the correct position. Use the unaffected arm to push the dowel and rotate the affected arm outward. Hold at end range, then slowly return.',
'["Keep the elbow firmly pinned to your side — the towel helps maintain this","The good arm does the pushing — let the affected arm be passive","Move slowly and stop at the first sign of pinching or sharp pain","Sit tall with shoulders back — avoid slumping"]',
120, 1, '["dowel rod","towel"]',
'External rotators',
'Infraspinatus, Teres minor',
'Posterior deltoid, Supraspinatus (stabiliser), Rhomboids, Middle trapezius',
'Shoulder external rotation',
'transverse',
'Smaller range of motion. Thicker towel roll. Stop well before end range.',
'Seated, elbows at 90 degrees, dowel pushing affected arm into external rotation. Towel between elbow and body.',
'Increase hold time at end range. Reduce towel thickness for more adduction. Perform standing.',
'{"inhale":4,"hold":0,"exhale":6}',
2);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(32, 3, 'Band Internal Rotation', 'Attach a resistance band to a door handle or sturdy anchor at elbow height. Stand sideways so the affected arm is closest to the anchor. Hold the band with the affected hand, elbow bent to 90 degrees and pinned to your side. Rotate your forearm inward across your body against the band resistance. Slowly return to the start position.',
'["Keep the elbow glued to your side throughout — place a towel there as a reminder","Control the return phase — don''t let the band snap your arm back","Stand tall and avoid rotating your trunk to compensate","The movement is only at the forearm — the upper arm stays still"]',
120, 1, '["resistance band","door"]',
'Internal rotators',
'Subscapularis, Pectoralis major (sternal), Latissimus dorsi, Teres major',
'Anterior deltoid, Biceps (short head), Serratus anterior (stabiliser)',
'Shoulder internal rotation',
'transverse',
'Use a lighter resistance band. Smaller range of motion. Stand closer to anchor.',
'Standing sideways to anchor, elbow at 90 degrees pinned to side, rotating forearm inward against band.',
'Use heavier band. Add a pause at end range. Step farther from anchor for more tension.',
'{"inhale":4,"hold":0,"exhale":4}',
3);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(32, 4, 'Door Frame Pec Stretch', 'Stand in a doorway with your forearm placed vertically against the door frame, elbow at shoulder height and bent to 90 degrees. Step the foot on the same side slightly forward through the doorway. Gently lean your body forward and slightly away from the arm until you feel a stretch across the chest and front of the shoulder. Hold and breathe.',
'["Keep the forearm flat against the frame — elbow at shoulder height","Step through gently — the stretch should be felt across the pec, not in the shoulder joint","Don''t push through sharp or pinching pain in the front of the shoulder","Keep your core engaged and avoid arching the lower back"]',
120, 1, '["door frame"]',
'Pectoralis major, Anterior deltoid',
'Pectoralis major (sternal and clavicular heads), Pectoralis minor, Anterior deltoid',
'Biceps (short head), Coracobrachialis, Subclavius, Serratus anterior',
'Shoulder horizontal abduction, Shoulder external rotation',
'transverse',
'Place elbow below shoulder height. Smaller step forward. Less lean.',
'Forearm on door frame at shoulder height, stepping through doorway. Gentle lean forward.',
'Raise elbow above shoulder height to bias upper pec fibres. Deeper step through. Hold longer.',
'{"inhale":4,"hold":0,"exhale":6}',
4);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(32, 5, 'Sleeper Stretch (IR Over-Pressure)', 'Lie on your affected side with the shoulder and elbow both at 90 degrees — upper arm on the floor in front of you, forearm pointing toward the ceiling. Use the opposite hand to gently push the forearm toward the floor, rotating the shoulder inward. You should feel a stretch in the back of the shoulder. Hold at end range.',
'["Lie directly on the shoulder blade — not rolled forward or back","Push the forearm down gently — this is a stretch, not a crank","Stop immediately if you feel a pinch in the front of the shoulder","Keep the elbow in line with the shoulder, not drifting toward the belly"]',
120, 1, '[]',
'Posterior capsule, External rotators',
'Infraspinatus, Teres minor, Posterior deltoid, Posterior glenohumeral capsule',
'Rhomboids, Middle trapezius, Supraspinatus',
'Shoulder internal rotation (over-pressure)',
'transverse',
'Minimal downward pressure. Place a pillow under the head for comfort. Bend knees for stability.',
'Lying on affected side, shoulder and elbow at 90 degrees. Opposite hand pushes forearm toward floor.',
'Increase pressure gently. Hold for longer periods. Combine with gentle oscillations at end range.',
'{"inhale":4,"hold":0,"exhale":6}',
5);

-- DAY 2: Active Movement & Bands

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(33, 1, 'Active Flexion', 'Stand or sit tall with the arm at your side, palm facing inward. Slowly raise the affected arm forward and upward as high as you can, keeping the elbow straight. Pause at the top of your available range, then slowly lower back down with control. Focus on smooth, pain-free movement through the full available range.',
'["Lead with the thumb pointing up — this clears the subacromial space","Move slowly and with control — avoid jerking or using momentum","Only go as high as you can without pain or compensating with your trunk","Keep the shoulder blade gliding naturally — don''t force it down"]',
120, 1, '[]',
'Anterior deltoid, Supraspinatus',
'Anterior deltoid, Supraspinatus (0-90 degrees), Pectoralis major (clavicular head)',
'Biceps long head, Middle deltoid, Serratus anterior, Upper trapezius, Infraspinatus (stabiliser)',
'Shoulder flexion',
'sagittal',
'Use the unaffected arm to assist. Lean slightly forward to reduce gravity demand. Partial range only.',
'Standing, arm raising forward and up with control. Full available range with straight elbow.',
'Hold a light weight (0.5-1kg). Add a pause at the top. Slow eccentric lowering (5 seconds down).',
'{"inhale":4,"hold":0,"exhale":4}',
6);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(33, 2, 'Active Extension', 'Stand tall with the arm at your side, palm facing inward. Slowly move the affected arm straight backward behind you, keeping the elbow straight. You will feel the front of the shoulder stretch as the arm moves back. Hold briefly at end range, then return with control. Keep the trunk upright — avoid leaning forward.',
'["Keep the elbow straight and the palm facing inward or backward","Don''t lean forward — the movement should come from the shoulder only","You will feel a stretch in the front of the shoulder and chest","Move through a pain-free range — extension range is naturally smaller than flexion"]',
120, 1, '[]',
'Posterior deltoid, Latissimus dorsi',
'Posterior deltoid, Latissimus dorsi, Teres major, Long head of triceps',
'Rhomboids, Middle trapezius, Infraspinatus, Lower trapezius',
'Shoulder extension',
'sagittal',
'Smaller range. Bend the elbow slightly. Use a wall behind you as a guide for range.',
'Standing, arm moving straight back with control. Full available range, trunk upright.',
'Hold a light weight. Add a 3-second pause at end range. Combine with slight trunk rotation.',
'{"inhale":4,"hold":0,"exhale":4}',
7);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(33, 3, 'Band External Rotation', 'Attach a resistance band to a door handle or sturdy anchor at elbow height. Stand sideways so the affected arm is farthest from the anchor. Hold the band with the affected hand, elbow bent to 90 degrees and pinned to your side. Rotate your forearm outward away from your body against the band resistance. Slowly return to the start position.',
'["Keep the elbow glued to your side — this isolates the rotator cuff","Control the return — the eccentric phase is just as important as the pull","Stand tall and avoid twisting your body to cheat the movement","Squeeze the shoulder blade back slightly as you rotate out"]',
120, 1, '["resistance band","door"]',
'External rotators',
'Infraspinatus, Teres minor',
'Posterior deltoid, Rhomboids, Middle trapezius, Supraspinatus (stabiliser)',
'Shoulder external rotation',
'transverse',
'Use a lighter band. Stand closer to anchor. Smaller range of motion.',
'Standing sideways to anchor, elbow at 90 degrees pinned to side, rotating forearm outward against band.',
'Use heavier band. Add a 3-second hold at end range. Step farther from anchor.',
'{"inhale":4,"hold":0,"exhale":4}',
8);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(33, 4, 'Cat Camel Stretch', 'Start on all fours with hands under shoulders and knees under hips. On an inhale, drop the belly toward the floor, lift the chest and tailbone, and gently look up (camel/cow). On an exhale, round the spine toward the ceiling, tuck the chin and tailbone, and press the floor away (cat). Move slowly between these two positions, letting the shoulder blades glide freely.',
'["Move through the full spinal range — from tailbone to the crown of the head","Let the shoulder blades protract fully in cat (spread apart) and retract in camel (squeeze together)","Move with your breath — inhale into extension, exhale into flexion","Keep the movement slow and controlled — this is mobilisation, not speed work"]',
120, 0, '[]',
'Spinal erectors, Scapular stabilisers',
'Erector spinae, Serratus anterior, Rhomboids, Middle and lower trapezius',
'Rectus abdominis, External obliques, Latissimus dorsi, Pectoralis minor, Multifidus',
'Spinal flexion, Spinal extension, Scapular protraction, Scapular retraction',
'sagittal',
'Smaller range of motion. Focus on the thoracic spine only. Place a cushion under the knees.',
'All fours, alternating between spinal extension (camel) and flexion (cat). Shoulder blades moving freely.',
'Add a pause at each end position. Emphasise scapular movement. Combine with lateral spinal flexion.',
'{"inhale":4,"hold":0,"exhale":4}',
9);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(33, 5, 'Band Pull-Apart', 'Stand tall holding a resistance band in front of you at shoulder height with both hands, arms extended. Hands should be roughly shoulder-width apart on the band. Pull the band apart by squeezing the shoulder blades together and moving the hands outward until the band touches your chest. Slowly return to the start position with control.',
'["Squeeze the shoulder blades together at the end — think about putting them in your back pockets","Keep the arms at shoulder height throughout — don''t let them drop","Control the return — don''t just let the band snap back","Keep the core engaged and avoid arching the lower back"]',
120, 0, '["resistance band"]',
'Rhomboids, Posterior deltoid',
'Rhomboids major and minor, Posterior deltoid, Middle trapezius',
'Lower trapezius, Infraspinatus, Teres minor, Erector spinae (thoracic)',
'Scapular retraction, Shoulder horizontal abduction',
'transverse',
'Use a lighter band. Wider hand grip for less resistance. Partial range pull-apart.',
'Standing, arms extended at shoulder height, pulling band apart until it touches chest. Shoulder blades squeezed.',
'Use heavier band. Narrow hand grip. Add a 3-second squeeze at end range. Perform with a slow tempo.',
'{"inhale":4,"hold":0,"exhale":4}',
10);

-- DAY 3: Strengthening & Stretch

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(34, 1, 'Internal Rotation with Dowel Rod', 'Stand or sit tall. Hold a dowel rod or broomstick behind your back with both hands — the affected hand lower, the unaffected hand higher. Use the top hand to gently pull the stick upward, which draws the lower hand (affected arm) up your back into internal rotation. Hold at end range, then slowly release.',
'["Use the top hand to do the work — the affected arm is passive","Pull gently and steadily — don''t jerk","You should feel the stretch in the front of the affected shoulder","Keep the torso upright — avoid leaning sideways to compensate"]',
120, 1, '["dowel rod"]',
'Internal rotators, Anterior shoulder',
'Subscapularis, Pectoralis major, Teres major, Latissimus dorsi, Anterior deltoid',
'Biceps (short head), Coracobrachialis, Anterior glenohumeral capsule',
'Shoulder internal rotation, Shoulder extension',
'sagittal',
'Very small range. Stop as soon as stretch is felt. Keep the hand low on the back.',
'Standing, dowel behind back, top hand pulling stick upward to rotate affected shoulder internally.',
'Increase the lift gradually. Walk the lower hand higher up the back over sessions. Hold longer at end range.',
'{"inhale":4,"hold":0,"exhale":6}',
11);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(34, 2, 'Shoulder Abduction Sidelying', 'Lie on your unaffected side with the affected arm on top. Start with the affected arm resting along your body. Keeping the elbow straight, slowly raise the arm up toward the ceiling and then continue overhead toward your ear, as far as comfortable. Slowly lower back to the start. Gravity is reduced in this position, making it easier than standing abduction.',
'["Move slowly and with control — this gravity-eliminated position is your friend","Keep the elbow straight and lead with the thumb pointing up","Don''t roll forward or backward — stay stacked on your side","Only go as far as pain allows — range will improve over time"]',
120, 1, '[]',
'Middle deltoid, Supraspinatus',
'Middle deltoid, Supraspinatus',
'Upper trapezius, Serratus anterior, Infraspinatus (stabiliser), Anterior deltoid',
'Shoulder abduction',
'frontal',
'Bend the elbow. Partial range only. Use the other hand to assist the arm up.',
'Sidelying, affected arm on top, raising straight arm from side to overhead with control.',
'Hold a light weight (0.5kg). Add a pause at the top. Slow 5-second lowering.',
'{"inhale":4,"hold":0,"exhale":4}',
12);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(34, 3, 'Band Flexion', 'Stand on one end of a resistance band with the foot on the affected side. Hold the other end with the affected hand, palm facing inward. Keeping the elbow straight, raise the arm forward and up against the band resistance to shoulder height or as high as comfortable. Slowly lower with control.',
'["Lead with the thumb pointing up to clear the subacromial space","Keep the elbow straight but not locked — a micro-bend is fine","Control the lowering phase — don''t let the band pull your arm down","Stand tall and avoid leaning backward to compensate"]',
120, 1, '["resistance band"]',
'Anterior deltoid',
'Anterior deltoid, Supraspinatus (initial phase), Pectoralis major (clavicular head)',
'Biceps long head, Middle deltoid, Serratus anterior, Upper trapezius',
'Shoulder flexion',
'sagittal',
'Use a lighter band. Raise to only 90 degrees. Bend the elbow slightly.',
'Standing on band, raising affected arm forward to shoulder height against resistance. Elbow straight.',
'Use heavier band. Raise above shoulder height. Add a 3-second hold at the top.',
'{"inhale":4,"hold":0,"exhale":4}',
13);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(34, 4, 'Band Face Pull', 'Attach a resistance band to a door handle or anchor at face height. Hold both ends of the band with both hands, palms facing down. Step back to create tension. Pull the band toward your face, driving the elbows wide and high. At the end, your hands should be beside your ears with elbows flared. Squeeze the shoulder blades together, then slowly return.',
'["Pull toward your face, not your chest — elbows should end up high and wide","Squeeze the shoulder blades hard at the end position","Keep the wrists straight — don''t let them curl","This is a rear delt and scapular exercise — you should feel it between the shoulder blades"]',
120, 0, '["resistance band","door"]',
'Rear deltoids, Rhomboids, Rotator cuff',
'Posterior deltoid, Rhomboids, Middle trapezius, Infraspinatus, Teres minor',
'Lower trapezius, Supraspinatus, Erector spinae (thoracic), Serratus anterior',
'Scapular retraction, Shoulder horizontal abduction, Shoulder external rotation',
'multi-planar',
'Use a lighter band. Partial range pull. Focus on squeezing shoulder blades without pulling to face.',
'Standing, pulling band toward face with elbows high and wide. Shoulder blades squeezed at end.',
'Use heavier band. Add a 3-second hold at end position. Slow 4-second return. Step farther back.',
'{"inhale":4,"hold":0,"exhale":4}',
14);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(34, 5, 'Eccentric External Rotation', 'Attach a resistance band to a door at elbow height. Stand sideways with the affected arm farthest from the door. Hold the band, elbow at 90 degrees pinned to your side with a towel roll. Use the unaffected hand to help rotate the arm outward to end range. Then let go with the helping hand and slowly resist the band pulling your arm back inward over 5 seconds. This is the eccentric (lowering) phase. Reset with help and repeat.',
'["The key is the slow return — resist the band for a full 5-second count","Use the good hand to get to the start position — don''t fight to get there","Keep the towel roll between elbow and body to set correct position","You should feel the back of the shoulder working hard during the slow return"]',
120, 1, '["resistance band","towel"]',
'External rotators (eccentric)',
'Infraspinatus, Teres minor (eccentric loading)',
'Posterior deltoid, Supraspinatus (stabiliser), Rhomboids, Middle trapezius',
'Shoulder external rotation (eccentric)',
'transverse',
'Use a lighter band. Slow the return over 3 seconds instead of 5. Smaller range of motion.',
'Standing sideways to anchor. Assisted to end range ER, then slow 5-second eccentric return against band.',
'Use heavier band. Slow the return to 8 seconds. Increase range. Remove towel roll for added challenge.',
'{"inhale":4,"hold":0,"exhale":6}',
15);

-- DAY 4: Advanced & Integration

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(35, 1, 'Hand Behind Back Stretch with Stick', 'Stand tall. Hold a dowel rod or stick behind your back with both hands. The affected hand grips the stick near the bottom, the unaffected hand near the top. Gently use the stick to guide the affected hand upward along your spine, stretching the shoulder into internal rotation and extension. Hold at end range and breathe.',
'["The stick provides leverage — use the top hand to guide, don''t force","Aim to walk the affected hand up your spine toward the shoulder blades over time","Keep the chest lifted and avoid rounding forward","You should feel a stretch in the front of the affected shoulder and inside the arm"]',
120, 1, '["dowel rod"]',
'Internal rotators, Anterior shoulder',
'Subscapularis, Anterior deltoid, Pectoralis major, Latissimus dorsi',
'Teres major, Biceps (short head), Coracobrachialis, Anterior glenohumeral capsule',
'Shoulder internal rotation, Shoulder extension',
'sagittal',
'Keep the affected hand very low (hip level). Minimal upward pull. Use a longer stick for more control.',
'Standing, stick behind back, top hand guiding affected hand upward along spine. Chest lifted.',
'Walk the hand higher. Hold longer at end range. Reduce assistance from the top hand gradually.',
'{"inhale":4,"hold":0,"exhale":6}',
16);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(35, 2, 'Active External Rotation Two Hands', 'Sit or stand tall. Bend both elbows to 90 degrees with forearms parallel in front of you, palms facing up. Keeping the elbows pinned to your sides, rotate both forearms outward simultaneously as far as comfortable. Hold at end range, then slowly return. Using both arms together helps the brain pattern the movement symmetrically.',
'["Keep both elbows firmly against your sides throughout","Rotate outward equally on both sides — the unaffected arm guides the pattern","Move slowly and notice any difference in range between sides","Keep the wrists neutral — don''t flick them outward to cheat range"]',
120, 1, '["dowel rod"]',
'External rotators (both sides)',
'Infraspinatus, Teres minor (both shoulders)',
'Posterior deltoid, Supraspinatus, Rhomboids, Middle trapezius',
'Shoulder external rotation (bilateral active)',
'transverse',
'Smaller range of motion. Move only the affected side to its comfortable limit. Seated for stability.',
'Seated or standing, both elbows at 90 degrees pinned to sides, rotating forearms outward together.',
'Hold a dowel rod across both palms to link the movement. Add band resistance. Hold at end range longer.',
'{"inhale":4,"hold":0,"exhale":4}',
17);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(35, 3, 'Band Abduction', 'Stand on one end of a resistance band with the foot on the affected side. Hold the other end with the affected hand, arm at your side, palm facing inward. Keeping the elbow straight, raise the arm out to the side against the band resistance to shoulder height. Slowly lower back with control.',
'["Lead with the elbow, not the hand — think about lifting the elbow toward the ceiling","Keep a slight forward lean of the arm (about 30 degrees in front of the body) — this is the scapular plane and is safer for the shoulder","Control the lowering — don''t let the band pull your arm down","Avoid hiking the shoulder toward the ear — keep the shoulder blade down"]',
120, 1, '["resistance band"]',
'Middle deltoid, Supraspinatus',
'Middle deltoid, Supraspinatus',
'Upper trapezius, Serratus anterior, Infraspinatus (stabiliser), Anterior deltoid',
'Shoulder abduction',
'frontal',
'Use a lighter band. Raise to only 60-70 degrees. Bend the elbow.',
'Standing on band, raising arm out to the side to shoulder height against resistance. Elbow straight.',
'Use heavier band. Raise slightly above shoulder height. Add a 3-second hold at the top.',
'{"inhale":4,"hold":0,"exhale":4}',
18);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(35, 4, '90° Internal Rotation with Band', 'Attach a resistance band to a door at elbow height. Stand sideways with the affected arm closest to the anchor. Raise the affected arm to 90 degrees of abduction with the elbow bent to 90 degrees (arm forms an L shape out to the side). Hold the band and rotate the forearm downward toward the floor against resistance. Slowly return to the start.',
'["Maintain the arm at exactly 90 degrees of abduction — don''t let it drop","The rotation happens at the shoulder — the elbow stays at shoulder height","Control the return — the band will try to externally rotate you","This is an advanced exercise — skip it if the 90-degree position causes pain"]',
120, 1, '["resistance band","door"]',
'Internal rotators at 90° abduction',
'Subscapularis, Pectoralis major (sternal), Teres major, Latissimus dorsi',
'Anterior deltoid, Serratus anterior (stabiliser), Biceps (short head)',
'Shoulder internal rotation at 90° abduction',
'transverse',
'Use a very light band. Partial range only. Reduce abduction angle to 70 degrees if needed.',
'Standing sideways, arm at 90° abduction and 90° elbow bend. Rotating forearm down against band resistance.',
'Use heavier band. Add a 3-second hold at end range. Slow 5-second return. Progress to standing external rotation at 90°.',
'{"inhale":4,"hold":0,"exhale":4}',
19);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(35, 5, 'Door Frame Fingertip Hang', 'Stand in a doorway and reach up to grip the top of the door frame with your fingertips. Walk your feet slightly forward so your arms are behind you and your body weight gently creates traction through the shoulders. Keep a slight bend in the knees and let your body weight decompress the shoulder joints. Relax and breathe.',
'["Only hang as much weight as is comfortable — keep the feet on the floor","Relax the shoulders and let gravity create gentle traction","This should feel like decompression and relief — not pain","Breathe deeply and let the ribcage expand under the stretch"]',
120, 1, '["door frame"]',
'Latissimus dorsi, Teres major, Shoulder joint capsule',
'Latissimus dorsi, Teres major, Pectoralis major, Inferior glenohumeral capsule',
'Biceps long head, Triceps long head, Rhomboids, Lower trapezius, Thoracolumbar fascia, Intercostals',
'Shoulder flexion (passive), Spinal decompression',
'sagittal',
'Minimal weight through arms. Keep most weight on feet. Shorter hold time.',
'Standing in doorway, fingertips gripping frame overhead. Feet forward, body weight creating shoulder traction.',
'Increase body weight through arms. Longer hold. Progress to a pull-up bar with full dead hang if pain-free.',
'{"inhale":4,"hold":0,"exhale":6}',
20);
