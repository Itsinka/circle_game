##right click when the mouse starts spinning
import pyautogui
import math

# Set the radius and center of the circle
R = 200
(x, y) = pyautogui.size()
(cx, cy) = (x / 2, y / 2)

# Move the mouse to the starting position
pyautogui.moveTo(cx + R, cy)

# Keep track of the score
score = 0

# Run the game loop
while True:
    # Move the mouse in a circular motion
    for i in range(500):

        if i % 12 == 0:
            pyautogui.moveTo(cx + R * math.cos(math.radians(i)), cy + R * math.sin(math.radians(i)))

    # Check if the user clicked inside the circle
    (x, y) = pyautogui.position()
    if math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= R:

        score += 1
        print("Score:", score)
    else:
        # End the game if the user clicked outside the circle
        print("Game over! Final score:", score)
        break
