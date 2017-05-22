mkdir directory


cd directory


touch blank

for i in {1..5};
do
 echo "Hello " >> greetings.txt;
done

for x in {1..5};
do
 cat greetings.txt > $x.txt;
done



echo "cat" > pets.txt
echo "dog" >> pets.txt

echo "hamster" >> pets.txt


echo "cat" > commands.txt
 
echo "ls" >> commands.txt

echo "pwd" >> commands.txt 


cat pets.txt commands.txt | sort | uniq > lovelyCommands.txt
